document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('profileForm');
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const profileImageInput = document.getElementById('profile_image');
    const profilePreview = document.getElementById('profilePreview');

    function setPreviewImage(fileName) {
        if (fileName) {
            profilePreview.src = `../uploads/${fileName}`;
        } else {
            profilePreview.src = 'https://via.placeholder.com/120?text=User';
        }
    }

    function loadProfile() {
        const query = user.id ? `id=${encodeURIComponent(user.id)}` : `email=${encodeURIComponent(user.email || '')}`;

        fetch(`http://localhost/Company-Inventory-Management-System/backend/api/get_profile.php?${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                return response.json();
            })
            .then(data => {
                if (!data.success || !data.data) {
                    throw new Error(data.message || 'Failed to load profile');
                }

                userIdInput.value = data.data.id;
                nameInput.value = data.data.name || '';
                emailInput.value = data.data.email || '';
                setPreviewImage(data.data.profile_image || '');
            })
            .catch(error => {
                alert(error.message);
            });
    }

    profileImageInput.addEventListener('change', function () {
        const file = this.files && this.files[0];
        if (file) {
            profilePreview.src = URL.createObjectURL(file);
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        formData.set('name', (nameInput.value || '').trim());
        formData.set('email', (emailInput.value || '').trim());

        fetch('http://localhost/Company-Inventory-Management-System/backend/api/update_profile.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message || 'Profile updated');

                if (data.success && data.data) {
                    const previous = JSON.parse(localStorage.getItem('user')) || {};
                    localStorage.setItem('user', JSON.stringify({ ...previous, ...data.data }));
                    passwordInput.value = '';
                    setPreviewImage(data.data.profile_image || '');
                }
            })
            .catch(error => {
                alert(error.message);
            });
    });

    loadProfile();
});
