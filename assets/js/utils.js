// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Show/hide loader
function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Toggle mobile menu
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// Format date
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format time
function formatTime(timeStr) {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Set minimum date to today
function setMinDate(inputId) {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById(inputId).setAttribute('min', today);
}

// Generate time slots (9 AM to 6 PM)
function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
        for (let min = 0; min < 60; min += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00`;
            slots.push(time);
        }
    }
    return slots;
}


// Axios interceptor for auth
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        }
        return Promise.reject(error);
    }
);
