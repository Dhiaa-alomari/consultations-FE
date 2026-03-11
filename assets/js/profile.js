protectPage();

async function loadProfile() {
    try {
        const response = await axios.get(API.profile);
        const user = response.data;
        
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('first_name').value = user.first_name || '';
        document.getElementById('last_name').value = user.last_name || '';
        document.getElementById('phone').value = user.profile.phone || '';
        document.getElementById('bio').value = user.profile.bio || '';
        
        if (user.profile.avatar_url) {
            document.getElementById('avatarImg').src = user.profile.avatar_url;
        }
    } catch (error) {
        showToast('Failed to load profile', 'error');
    }
}

// Load appointments
async function loadAppointments() {
    try {
        const response = await axios.get(API.myAppointments);
        const appointments = response.data.results || response.data;
        
        const tbody = document.getElementById('appointmentsBody');
        if (appointments.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No appointments yet</td></tr>';
            return;
        }
        
        tbody.innerHTML = appointments.map(appt => `
            <tr>
                <td>${formatDate(appt.date)}</td>
                <td>${formatTime(appt.time)}</td>
                <td>${appt.category_name}</td>
                <td>${appt.duration} min</td>
                <td>$${appt.total_price}</td>
                <td><span class="badge ${appt.is_paid ? 'badge-success' : 'badge-warning'}">
                    ${appt.is_paid ? 'Paid' : 'Pending'}
                </span></td>
            </tr>
        `).join('');
    } catch (error) {
        showToast('Failed to load appointments', 'error');
    }
}

// Profile update
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        phone: document.getElementById('phone').value,
        bio: document.getElementById('bio').value
    };
    
    showLoader();
    try {
        await axios.patch(API.profile, data);
        hideLoader();
        showToast('Profile updated!');
    } catch (error) {
        hideLoader();
        showToast('Update failed', 'error');
    }
});

// Password change
document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPass = document.getElementById('new_password').value;
    const confirm = document.getElementById('confirm_password').value;
    
    if (newPass !== confirm) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    const data = {
        old_password: document.getElementById('old_password').value,
        new_password: newPass,
        confirm_password: confirm
    };
    
    showLoader();
    try {
        await axios.post(API.changePassword, data);
        hideLoader();
        showToast('Password changed!');
        e.target.reset();
    } catch (error) {
        hideLoader();
        const msg = error.response?.data?.error || 'Password change failed';
        showToast(msg, 'error');
    }
});

// Avatar upload
document.getElementById('avatarInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    showLoader();
    try {
        await axios.patch(API.profile, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        hideLoader();
        showToast('Avatar updated!');
        loadProfile();
    } catch (error) {
        hideLoader();
        showToast('Upload failed', 'error');
    }
});

// Delete Account
document.getElementById('deleteAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }
    
    const data = {
        password: document.getElementById('delete_password').value
    };
    
    showLoader();
    try {
        await axios.delete(API.deleteAccount, { data });
        hideLoader();
        showToast('Account deleted!');

        setTimeout(() => {
            localStorage.clear();
            window.location.href = 'index.html';
        }, 5000);
    } catch (error) {
        hideLoader();
        const msg = error.response?.data?.error || 'Failed to delete account';
        showToast(msg, 'error');
        console.error('Delete account error:', error.response);
    }
});

// (UI): Show or hide delete account form
document.querySelector('.show-delete-form').addEventListener('click', function(event) {
    if ( event.target.classList.contains("active") ) {
        event.target.style.transform = "rotate(0deg)";
        event.target.classList.remove("active");
        document.getElementById('deleteAccountForm').style.display = 'none';
    } else {
        event.target.style.transform = "rotate(45deg)";
        event.target.classList.add("active");
        document.getElementById('deleteAccountForm').style.display = 'block';
    }
});

loadProfile();
loadAppointments();