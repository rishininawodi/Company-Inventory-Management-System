document.addEventListener('DOMContentLoaded', function () {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('addProductForm');
    const categoryInput = document.getElementById('category_name');
    const categorySuggestions = document.getElementById('category_suggestions');

    function loadCategories() {
        fetch('http://localhost/Company-Inventory-Management-System/backend/api/get_categories.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load categories');
                }
                return response.json();
            })
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    data.data.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.name;
                        categorySuggestions.appendChild(option);
                    });
                }
            })
            .catch(error => {
                console.error('Error loading categories:', error);
                alert('Could not load categories');
            });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        formData.set('category_name', (categoryInput.value || '').trim());

        fetch('http://localhost/Company-Inventory-Management-System/backend/api/add_product.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message || 'Product added successfully');

                if (data.message && data.message.toLowerCase().includes('successfully')) {
                    window.location.href = 'products.html';
                }
            })
            .catch(error => {
                alert(error.message);
            });
    });

    loadCategories();
});
