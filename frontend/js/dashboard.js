document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("username").innerText = user.name;

    loadStats();
    loadRecentProducts();
});

function loadStats() {
    fetch("http://localhost/Company-Inventory-Management-System/backend/api/dashboard_stats.php")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("totalProducts").innerText = data.data.total_products || 0;
                document.getElementById("totalStock").innerText = data.data.total_stock || 0;
                document.getElementById("totalCategories").innerText = data.data.total_categories || 0;
                document.getElementById("totalUsers").innerText = data.data.total_users || 0;
            } else {
                console.error("Failed to load dashboard stats:", data.message);
            }
        })
        .catch(error => console.error("Error loading dashboard stats:", error));
}

function loadRecentProducts() {
    fetch("http://localhost/Company-Inventory-Management-System/backend/api/get_products.php?limit=5")
        .then(res => res.json())
        .then(data => {
            const productTable = document.getElementById("productTable");
            productTable.innerHTML = ""; // Clear existing rows

            if (data.data && data.data.length > 0) {
                data.data.forEach(p => {
                    productTable.innerHTML += `
                        <tr>
                            <td>${p.name}</td>
                            <td>${p.price}</td>
                            <td>${p.stock}</td>
                            <td>${p.category_name || '-'}</td>
                        </tr>
                    `;
                });
            } else {
                productTable.innerHTML = '<tr><td colspan="4" class="text-center">No recent products found.</td></tr>';
            }
        })
        .catch(error => {
            console.error("Error loading recent products:", error);
            const productTable = document.getElementById("productTable");
            productTable.innerHTML = '<tr><td colspan="4" class="text-center">Error loading products.</td></tr>';
        });
}