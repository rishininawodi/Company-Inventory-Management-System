document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('editProductForm');
    const productIdInput = document.getElementById('productId');
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');
    const categorySelect = document.getElementById('category_name');
    const existingImagesContainer = document.getElementById('existingImages');
    const newImagesInput = document.getElementById('new_images');

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        alert('Product ID is missing');
        window.location.href = 'products.html';
        return;
    }

    function fetchCategories(selectedId) {
        return fetch('http://localhost/Company-Inventory-Management-System/backend/api/get_categories.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load categories');
                }
                return response.json();
            })
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    categorySelect.innerHTML = '<option value="">Select category</option>';
                    data.data.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.name;
                        option.textContent = category.name;
                        if (String(category.name) === String(selectedId)) {
                            option.selected = true;
                        }
                        categorySelect.appendChild(option);
                    });
                }
            });
    }

    function renderExistingImages(images) {
        existingImagesContainer.innerHTML = '';

        if (!images || images.length === 0) {
            existingImagesContainer.innerHTML = '<div class="col-12 text-muted">No images found for this product.</div>';
            return;
        }

        images.forEach(imagePath => {
            const col = document.createElement('div');
            col.className = 'col-md-3';
            col.innerHTML = `
                <div class="card">
                    <img src="../uploads/${imagePath}" class="card-img-top" style="height:120px;object-fit:cover;" alt="Product image">
                    <div class="card-body p-2 text-center">
                        <button type="button" class="btn btn-sm btn-outline-danger" data-image-path="${imagePath}">
                            Delete
                        </button>
                    </div>
                </div>
            `;

            const deleteBtn = col.querySelector('button');
            deleteBtn.addEventListener('click', function () {
                const deleteFormData = new FormData();
                deleteFormData.append('product_id', productId);
                deleteFormData.append('image_path', imagePath);

                fetch('http://localhost/Company-Inventory-Management-System/backend/api/delete_product_image.php', {
                    method: 'POST',
                    body: deleteFormData
                })
                    .then(response => response.json())
                    .then(result => {
                        alert(result.message || 'Image deleted');
                        if (result.success) {
                            fetchProduct();
                        }
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            });

            existingImagesContainer.appendChild(col);
        });
    }

    function fetchProduct() {
        return fetch(`http://localhost/Company-Inventory-Management-System/backend/api/get_product.php?id=${encodeURIComponent(productId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load product');
                }
                return response.json();
            })
            .then(product => {
                if (!product || !product.id) {
                    throw new Error('Product not found');
                }

                productIdInput.value = product.id;
                nameInput.value = product.name || '';
                priceInput.value = product.price || '';
                stockInput.value = product.stock || '';

                renderExistingImages(product.images || []);

                return fetchCategories(product.category_name);
            })
            .catch(error => {
                alert(error.message);
                window.location.href = 'products.html';
            });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('http://localhost/Company-Inventory-Management-System/backend/api/update_product.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update product');
                }
                return response.json();
            })
            .then(data => {
                const files = newImagesInput.files;
                if (files && files.length > 0) {
                    const imageFormData = new FormData();
                    imageFormData.append('product_id', productId);
                    for (let i = 0; i < files.length; i++) {
                        imageFormData.append('images[]', files[i]);
                    }

                    return fetch('http://localhost/Company-Inventory-Management-System/backend/api/add_product_images.php', {
                        method: 'POST',
                        body: imageFormData
                    })
                        .then(response => response.json())
                        .then(imageResult => {
                            alert(data.message || 'Product updated successfully');
                            if (!imageResult.success) {
                                alert(imageResult.message || 'Failed to upload some images');
                            }
                            window.location.href = 'products.html';
                        });
                }

                alert(data.message || 'Product updated successfully');
                window.location.href = 'products.html';
            })
            .catch(error => {
                alert(error.message);
            });
    });

    fetchProduct();
});
