// API Configuration
const API_BASE_URL = 'https://consultations-be-795aeca2a205.herokuapp.com/api';
const STRIPE_PUBLIC_KEY = 'pk_test_51SzrEjE4vxlOTq8phRlHm5EZxkSJO2IiIJulW0B5ldKSJcHWHZ30hy3Kpc0Sy8NoBPatyeBVz6gXBUBzGClvH0w900K6OvHHxh';

// API Endpoints
const API = {
    // Auth
    register: `${API_BASE_URL}/auth/register/`, // POST
    login: `${API_BASE_URL}/auth/login/`, // POST
    logout: `${API_BASE_URL}/auth/logout/`, // POST
    profile: `${API_BASE_URL}/auth/profile/`, // GET, PATCH(update profile, upload avatar)
    changePassword: `${API_BASE_URL}/auth/change-password/`, // POST
    deleteAccount: `${API_BASE_URL}/auth/delete-account/`, // DELETE
    
    // Consultations
    categories: `${API_BASE_URL}/consultations/categories/`, // GET
    availability: `${API_BASE_URL}/consultations/availability/`,  // GET: {{API_BASE_URL}} + /consultations/availability/?category=1&date=2026-03-01
    appointments: `${API_BASE_URL}/consultations/appointments/`, // POST (create new appointment), GET: API_BASE_URL + /consultations/appointments/{{appointment_id}}/
    myAppointments: `${API_BASE_URL}/consultations/my-appointments/`, // GET
    
    // Orders
    cart: `${API_BASE_URL}/orders/cart/`, // GET: (view cart), POST: (add to cart)
    updateItemFromCart: `${API_BASE_URL}/orders/cart/items/`, // DELETE: (remove item from cart), PATCH: (update item) {{API_BASE_URL}} + /orders/cart/items/{{item_id}}/
    clearCart: `${API_BASE_URL}/orders/cart/clear/`, // DELETE: (clear Entire Cart)
    checkout: `${API_BASE_URL}/orders/checkout/`, // POST: (checkout)
    orders: `${API_BASE_URL}/orders/`, // GET: (list user orders), GET: (order details) {{API_BASE_URL}} + /orders/{{order_id}}/
    
    // Contact
    contact: `${API_BASE_URL}/contact/`, // POST: (submit contact form)
    allMessages: `${API_BASE_URL}/contact/messages/`, // GET
};
