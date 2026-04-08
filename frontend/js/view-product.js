document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        alert('Product ID is missing');
        window.location.href = 'products.html';
        return;
    }

    const detailName = document.getElementById('detailName');
    const detailPrice = document.getElementById('detailPrice');
    const detailStock = document.getElementById('detailStock');
    const detailCategory = document.getElementById('detailCategory');
    const detailCreatedAt = document.getElementById('detailCreatedAt');
    const productCarouselWrapper = document.getElementById('productCarouselWrapper');
    const badgesContainer = document.getElementById('badgesContainer');

    function getStatusBadge(stock) {
        if (stock === 0) {
            return '<span class="badge bg-danger">Out of Stock</span>';
        } else if (stock < 10) {
            return '<span class="badge bg-warning">Low Stock</span>';
        } else {
            return '<span class="badge bg-success">In Stock</span>';
        }
    }

    function renderBadges(category, stock) {
        const statusBadge = getStatusBadge(stock);
        const categoryBadge = `<span class="badge bg-info">${category || 'Uncategorized'}</span>`;
        badgesContainer.innerHTML = `<div>${statusBadge} ${categoryBadge}</div>`;
    }

    function renderImages(images) {
        if (!images || images.length === 0) {
            productCarouselWrapper.innerHTML = '<div class="border rounded p-4 text-center bg-white">No image available</div>';
            return;
        }

        const indicators = images.map((_, index) =>
            `<button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>`
        ).join('');

        const slides = images.map((img, index) =>
            `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="../uploads/${img}" class="d-block w-100 border rounded product-image" alt="Product image ${index + 1}">
            </div>`
        ).join('');

        productCarouselWrapper.innerHTML = `
            <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">${indicators}</div>
                <div class="carousel-inner">${slides}</div>
                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;
    }

    fetch(`http://localhost/Company-Inventory-Management-System/backend/api/get_product.php?id=${encodeURIComponent(productId)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            return response.json();
        })
        .then(product => {
            if (!product || !product.id) {
                throw new Error(product.message || 'Product not found');
            }

            detailName.textContent = product.name || '-';
            detailPrice.textContent = product.price || '-';
            detailStock.textContent = product.stock || '-';
            detailCategory.textContent = product.category_name || 'Uncategorized';
            detailCreatedAt.textContent = product.created_at || '-';

            renderBadges(product.category_name, product.stock);
            renderImages(product.images);
        })
        .catch(error => {
            alert(error.message);
            window.location.href = 'products.html';
        });
});
