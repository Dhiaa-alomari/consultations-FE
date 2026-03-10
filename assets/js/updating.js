async function updateBooking(event){
    event.preventDefault();
    const item = JSON.parse(localStorage.getItem('editItem'));

    const data = {
        category: parseInt(document.getElementById('consultationType').value),
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        duration: parseInt(document.getElementById('duration').value)
    };

    showLoader();
    try {
        // update a specific item in the cart using its ID
        const response = await axios.patch(`${API.updateItemFromCart}${item.id}/`, data);
        
        hideLoader();
        showToast('Updated appointment successfully!');
        
        // Redirect to payment
        setTimeout(() => {
            window.location.href = 'payment.html';
        }, 1000);

        localStorage.removeItem('editItem');
    } catch (error) {
        hideLoader();
        console.error('Updating error:', error.response?.data);
        
        const errorMsg = error.response?.data?.error || 
                        error.response?.data?.non_field_errors?.[0] ||
                        error.response?.data?.time?.[0] ||
                        error.response?.data?.date?.[0] ||
                        'Failed to update appointment. Please try again.';
        
        showToast(errorMsg, 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    protectPage();
    const item = JSON.parse(localStorage.getItem('editItem'));

    if (!item) {
        showToast('No item to edit', 'error');
        window.location.href = 'payment.html';
        return;
    }

    const select = document.getElementById('consultationType');
    const optionsArray = Array.from(select.options);

    optionsArray.forEach(opt => {
        if (opt.value == item.category) {
            opt.selected = true;
            select.dispatchEvent(new Event('change'));
        }
    });
    
    document.getElementById('bookingDate').value = item.date;
    document.getElementById('bookingTime').value = item.time;
    document.getElementById('duration').value = item.duration;
    document.getElementById('totalAmount').textContent = item.computed_price;
    
    updatePrice();
    updateTotal();
});