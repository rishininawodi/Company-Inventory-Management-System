document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    let currentPage = 1;
    let currentSort = 'name';
    let currentOrder = 'asc';

    const productTableBody = document.getElementById('productTableBody');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const filterBtn = document.getElementById('filterBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    const pagination = document.getElementById('pagination');

    function getExportFileName(ext) {
        const now = new Date();
        const stamp = now.toISOString().slice(0, 19).replace(/[:T]/g, '-');
        return `products-${stamp}.${ext}`;
    }

    async function fetchAllProductsForExport() {
        const url = `http://localhost/Company-Inventory-Management-System/backend/api/get_products.php?page=1&limit=100000&sort=${encodeURIComponent(currentSort)}&order=${encodeURIComponent(currentOrder)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch products for export');
        }

        const data = await response.json();
        return Array.isArray(data.data) ? data.data : [];
    }

    function escapeCsvValue(value) {
        const text = String(value ?? '');
        const escaped = text.replace(/"/g, '""');
        return `"${escaped}"`;
    }

    async function exportCsv() {
        try {
            const products = await fetchAllProductsForExport();
            if (products.length === 0) {
                alert('No products available to export.');
                return;
            }

            const headers = ['ID', 'Name', 'Price', 'Stock', 'Category', 'Created At'];
            const rows = products.map(p => [
                p.id,
                p.name,
                p.price,
                p.stock,
                p.category_name || 'Uncategorized',
                p.created_at || ''
            ]);

            const csvContent = [headers, ...rows]
                .map(row => row.map(cell => escapeCsvValue(cell)).join(','))
                .join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = getExportFileName('csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('CSV export error:', error);
            alert('Failed to export CSV.');
        }
    }

    async function exportPdf() {
        try {
            const products = await fetchAllProductsForExport();
            if (products.length === 0) {
                alert('No products available to export.');
                return;
            }

            if (!window.jspdf || typeof window.jspdf.jsPDF !== 'function') {
                throw new Error('jsPDF library not loaded');
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ orientation: 'landscape' });

            const tableBody = products.map(p => [
                p.id,
                p.name,
                p.price,
                p.stock,
                p.category_name || 'Uncategorized',
                p.created_at || ''
            ]);

            doc.setFontSize(14);
            doc.text('All Products Report', 14, 15);

            doc.autoTable({
                head: [['ID', 'Name', 'Price', 'Stock', 'Category', 'Created At']],
                body: tableBody,
                startY: 20,
                styles: { fontSize: 9 },
                headStyles: { fillColor: [33, 37, 41] }
            });

            doc.save(getExportFileName('pdf'));
        } catch (error) {
            console.error('PDF export error:', error);
            alert('Failed to export PDF.');
        }
    }

    function fetchProducts() {
        const search = searchInput.value.trim();
        const category = categoryFilter.value.trim();
        const url = `http://localhost/Company-Inventory-Management-System/backend/api/get_products.php?page=${currentPage}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(currentSort)}&order=${encodeURIComponent(currentOrder)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Products API request failed: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                productTableBody.innerHTML = '';
                if (data.data && data.data.length > 0) {
                    data.data.forEach(product => {
                        const row = `
                            <tr>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td>${product.stock}</td>
                                <td>${product.category_name || 'Uncategorized'}</td>
                                <td>
                                    <button class="btn btn-sm btn-info" onclick="viewProduct(${product.id})"><i class="bi bi-eye"></i></button>
                                    <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>`;
                        productTableBody.innerHTML += row;
                    });
                } else {
                    productTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No products found.</td></tr>';
                }
                setupPagination(data.total, data.limit);
            })
            .catch(error => {
                console.error('Error loading products:', error);
                productTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Failed to load products.</td></tr>';
                pagination.innerHTML = '';
            });
    }

    function fetchCategories() {
        fetch('http://localhost/Company-Inventory-Management-System/backend/api/get_categories.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Category API request failed: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    data.data.forEach(category => {
                        const option = `<option value="${category.name}">${category.name}</option>`;
                        categoryFilter.innerHTML += option;
                    });
                }
            })
            .catch(error => {
                console.error('Error loading categories:', error);
            });
    }

    function setupPagination(totalItems, itemsPerPage) {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.innerText = i;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                fetchProducts();
            });
            li.appendChild(a);
            pagination.appendChild(li);
        }
    }

    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const sort = header.getAttribute('data-sort');
            if (sort === currentSort) {
                currentOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort = sort;
                currentOrder = 'asc';
            }
            fetchProducts();
        });
    });

    function applySearchAndFilters() {
        currentPage = 1;
        fetchProducts();
    }

    filterBtn.addEventListener('click', applySearchAndFilters);

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applySearchAndFilters();
        }
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        fetchProducts();
    });

    categoryFilter.addEventListener('change', applySearchAndFilters);

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', exportCsv);
    }

    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportPdf);
    }

    fetchCategories();
    fetchProducts();
});

function viewProduct(id) {
    window.location.href = `view-product.html?id=${encodeURIComponent(id)}`;
}

function editProduct(id) {
    window.location.href = `edit-product.html?id=${encodeURIComponent(id)}`;
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`http://localhost/Company-Inventory-Management-System/backend/api/delete_product.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success || (data.message && data.message.toLowerCase().includes('deleted successfully'))) {
                
                location.reload();
            } else {
                alert(data.message || 'Failed to delete product.');
            }
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            alert('Error deleting product.');
        });
    }
}
