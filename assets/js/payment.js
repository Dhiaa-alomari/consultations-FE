protectPage();

const stripe = Stripe(STRIPE_PUBLIC_KEY); // Initialize Stripe with public key from config.js
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

async function loadCart() {
    try {
        const response = await axios.get(API.cart);
        const cart = response.data;
        
        if (!cart.items || cart.items.length === 0) {
            window.location.href = 'index.html';
            return;
        }

        document.getElementById('cartItems').innerHTML = cart.items.map(item => {
            const itemData = JSON.stringify(item).replace(/'/g, "&apos;");
            return `
            <div style="display:flex; justify-content:space-between; padding:0.5rem 0;" data-item-id="${item.id}">
                <span>${item.category_name} - ${item.duration}min</span>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;"
                    data-item='${JSON.stringify(itemData)}'>
                    <strong>$${item.computed_price}</strong>
                    <button onclick="editItem(this)" class="customize-btn edit-btn" >
                        &#9998;
                    </button>
                    <button onclick="removeFromCart(${item.id})" class="customize-btn delete-btn">
                        &times;
                    </button>
                </div>
            </div>
        `}).join('');
        
        document.getElementById('totalDisplay').innerHTML = `
            <span>Total:</span>
            <strong>$${cart.total}</strong>
        `;
    } catch (error) {
        showToast('Failed to load cart', 'error');
    }
}

// Remove a specific item from cart when delete button is clicked, and then reload the cart to reflect the changes
async function removeFromCart(itemId) {
    showLoader();
    try {
        await axios.delete(`${API.updateItemFromCart}${itemId}`);
        showToast('Removed from cart successfully!');
        await loadCart();
    } catch (error) {
        showToast('Failed to remove item from cart', 'error');
    }
    hideLoader();
}

// Redirect to updating.html page when edit button is clicked, and store the item data in localStorage for later use
function editItem(btn) {
    const item = JSON.parse(btn.parentElement.dataset.item);
    localStorage.setItem('editItem', item);
    window.location.href = 'updating.html';
}

async function handlePayment() {
    showLoader();
    try {
        const checkoutRes = await axios.post(API.checkout);
        const { client_secret } = checkoutRes.data;
        
        const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: { card: cardElement }
        });
        
        hideLoader();
        
        if (error) {
            showToast(error.message, 'error');
        } else if (paymentIntent.status === 'succeeded') {
            showToast('Payment successful!');
            setTimeout(() => window.location.href = 'profile.html', 2000);
        }
    } catch (error) {
        hideLoader();
        showToast('Payment failed', 'error');
    }
}

loadCart();