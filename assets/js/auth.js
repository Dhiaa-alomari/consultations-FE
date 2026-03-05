// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('access_token');
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Update UI based on auth state
function updateAuthUI() {
    const authButtons = document.getElementById('navAuth');
    const userMenu = document.getElementById('navUser');
    
    if (isLoggedIn()) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Logout
async function handleLogout() {
    try {
        const refresh = localStorage.getItem('refresh_token');
        await axios.post(API.logout, { refresh });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.clear();
        window.location.href = '/index.html';
    }
}

// Protect page (redirect if not logged in)
function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = '/pages/login.html';
    }
}

// Initialize auth UI
document.addEventListener('DOMContentLoaded', updateAuthUI);
