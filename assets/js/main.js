// Global state
let categories = [];
let selectedCategory = null;
let bookedTimes = [];

//when user clicks on cart, check if they are logged in and if there items in cart
document.getElementById('cartBtn').addEventListener('click', async function (event) {
    showLoader();
    if (!isLoggedIn()) {
        showToast('Please login to view your cart', 'error');
        return;
    }
    // check if cart has no items before redirecting to cart page
    const response = await axios.get(API.cart);
    const cart = response.data;
    
    if (!cart.items || cart.items.length === 0) {
        event.preventDefault(); // Disable link
        showToast('Your cart is empty');
        hideLoader();
        return;
    } else {
        // Redirect to cart page
        window.location.href = 'payment.html';
    } 
});

// Load categories
async function loadCategories() {
    try {
        const response = await axios.get(API.categories);
        
        // Handle both paginated and non-paginated responses
        if (response.data.results) {
            categories = response.data.results;
        } else if (Array.isArray(response.data)) {
            categories = response.data;
        } else {
            categories = [];
        }
        displayServices();
        populateCategorySelect();
    } catch (error) {
        console.error('Error loading categories:', error);
        showToast('Failed to load services. Please check backend connection.', 'error');
    }
}

// Display services in grid
function displayServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    if (categories.length === 0) {
        grid.innerHTML = '<div class="loading">No services available. Please add categories in Django admin.</div>';
        return;
    }
    
    grid.innerHTML = categories.map(cat => `
        <div class="service-card">
            <h3>${cat.category}</h3>
            <p>${cat.description || 'Professional legal consultation service'}</p>
            <p class="price">$${cat.price_per_15min} / 15 min</p>
        </div>
    `).join('');
}

// Populate category select dropdown
function populateCategorySelect() {
    const select = document.getElementById('consultationType');
    if (!select) return;
    
    if (categories.length === 0) {
        select.innerHTML = '<option value="">No services available</option>';
        select.disabled = true;
        return;
    }
    
    select.innerHTML = '<option value="">Select service...</option>' +
        categories.map(cat => 
            `<option value="${cat.id}" data-price="${cat.price_per_15min}">
                ${cat.category} - $${cat.price_per_15min}/15min
            </option>`
        ).join('');
    
    select.disabled = false;
}

// Update price display when category selected
function updatePrice() {
    const select = document.getElementById('consultationType');
    const option = select.options[select.selectedIndex];
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (option.value) {
        const price = option.getAttribute('data-price');
        priceDisplay.textContent = `$${price} per 15 minutes`;
        selectedCategory = categories.find(c => c.id == option.value);
        updateTotal();
    } else {
        priceDisplay.textContent = '';
        selectedCategory = null;
    }
}

// Check slot availability
async function checkAvailability() {
    const category = document.getElementById('consultationType').value;
    const date = document.getElementById('bookingDate').value;
    const timeSelect = document.getElementById('bookingTime');
    
    if (!category || !date) {
        timeSelect.disabled = true;
        timeSelect.innerHTML = '<option value="">Select date and service first</option>';
        return;
    }
    
    try {
        showLoader();
        const response = await axios.get(API.availability, {
            params: { category, date }
        });
        
        // Handle time format - convert to strings if needed
        bookedTimes = response.data.booked_times.map(time => {
            if (typeof time === 'string') return time;
            return time; // Already in correct format
        });
        
        populateTimeSlots();
        hideLoader();
    } catch (error) {
        console.error('Error checking availability:', error);
        hideLoader();
        showToast('Failed to check availability', 'error');
    }
}

// Populate available time slots
function populateTimeSlots() {
    const timeSelect = document.getElementById('bookingTime');
    const selectedDate = document.getElementById('bookingDate').value;
    const allSlots = generateTimeSlots(); // 09:00 - 17:45
    
    // Get current date and time
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Filter out past times if selected date is today
    let availableSlots = allSlots.filter(slot => {
        // Check if slot is already booked
        const isBooked = bookedTimes.some(booked => {
            const bookedStr = typeof booked === 'string' ? booked : String(booked);
            return bookedStr === slot || bookedStr.startsWith(slot.substring(0, 5));
        });
        
        if (isBooked) return false;
        
        // If selected date is today, filter out past times
        if (selectedDate === today) {
            const [slotHour, slotMinute] = slot.split(':').map(Number);
            
            // If slot hour is less than current hour, skip it
            if (slotHour < currentHour) return false;
            
            // If same hour but minutes have passed, skip it
            if (slotHour === currentHour && slotMinute <= currentMinute) return false;
        }
        
        return true;
    });
    
    if (availableSlots.length === 0) {
        timeSelect.innerHTML = '<option value="">No available slots for this date</option>';
        timeSelect.disabled = true;
        return;
    }
    
    timeSelect.innerHTML = '<option value="">Select time...</option>' +
        availableSlots.map(slot => 
            `<option value="${slot}">${formatTime(slot)}</option>`
        ).join('');
    
    timeSelect.disabled = false;
}


// Update total price
function updateTotal() {
    console.log("Updating total function...")
    const duration = document.getElementById('duration').value;
    const totalBox = document.getElementById('totalBox');
    const totalAmount = document.getElementById('totalAmount');
    
    // Validate time before calculating total
    if (!validateBookingTime()) {
        totalBox.style.display = 'none';
        return;
    }

    if (selectedCategory && duration) {
        const total = (selectedCategory.price_per_15min * duration) / 15;
        totalAmount.textContent = total.toFixed(2);
        totalBox.style.display = 'block';
    } else {
        totalBox.style.display = 'none';
    }
}

// Handle booking form submission
async function handleBooking(event) {
    event.preventDefault();
    
    if (!isLoggedIn()) {
        document.getElementById('authNotice').style.display = 'block';
        showToast('Please login to book an appointment', 'error');
        return;
    }
    
    // Validate booking time
    if (!validateBookingTime()) {
        return;
    }
    
    const data = {
        category: parseInt(document.getElementById('consultationType').value),
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        duration: parseInt(document.getElementById('duration').value)
    };
    
    showLoader();
    try {
        // Add to cart
        const response = await axios.post(API.cart, data);
        
        hideLoader();
        showToast('Added to cart successfully!');
        
        // Redirect to payment
        setTimeout(() => {
            window.location.href = 'payment.html';
        }, 1000);
    } catch (error) {
        hideLoader();
        console.error('Booking error:', error.response?.data);
        
        const errorMsg = error.response?.data?.error || 
                        error.response?.data?.non_field_errors?.[0] ||
                        error.response?.data?.time?.[0] ||
                        error.response?.data?.date?.[0] ||
                        'Booking failed. Please try again.';
        
        showToast(errorMsg, 'error');
    }
}

// Handle contact form submission
async function handleContact(event) {
    event.preventDefault();
    
    const data = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    showLoader();
    try {
        await axios.post(API.contact, data);
        hideLoader();
        showToast('Message sent successfully!');
        event.target.reset();
    } catch (error) {
        hideLoader();
        console.error('Contact error:', error);
        showToast('Failed to send message. Please try again.', 'error');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {  
    loadCategories();
    setMinDate('bookingDate');
    
    // Update auth notice visibility
    if (!isLoggedIn()) {
        const notice = document.getElementById('authNotice');
        if (notice) notice.style.display = 'block';
    }
});

// Check if selected time + duration exceeds working hours
function validateBookingTime() {
    const timeSelect = document.getElementById('bookingTime');
    const durationSelect = document.getElementById('duration');
    
    if (!timeSelect.value || !durationSelect.value) return true;
    
    const [hours, minutes] = timeSelect.value.split(':').map(Number);
    const duration = parseInt(durationSelect.value);
    
    // Calculate start and end time in minutes
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;
    const endHours = Math.floor(endMinutes / 60);
    
    // Working hours: 9:00 AM (540 minutes) to 6:00 PM (1080 minutes)
    const WORK_START = 9 * 60;  // 540 minutes (9:00 AM)
    const WORK_END = 18 * 60;   // 1080 minutes (6:00 PM)
    
    // Check if starts before 9 AM
    if (startMinutes < WORK_START) {
        showToast('Appointments start at 9:00 AM. Please choose a later time.', 'error');
        return false;
    }
    
    // Check if ends after 6 PM
    if (endMinutes > WORK_END) {
        showToast('Appointment would end after 6:00 PM. Please choose an earlier time or shorter duration.', 'error');
        return false;
    }
    
    return true;
}
