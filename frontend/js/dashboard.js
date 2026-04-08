let categoryStockChart = null;

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const username = document.getElementById("username");
    if (username) {
        username.innerText = user.name || "";
    }

    loadDashboard();
});

function loadDashboard() {
    fetch("http://localhost/Company-Inventory-Management-System/backend/api/dashboard_stats.php")
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load dashboard stats");
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                document.getElementById("totalProducts").innerText = data.data.total_products || 0;
                document.getElementById("totalStock").innerText = data.data.total_stock || 0;
                document.getElementById("totalCategories").innerText = data.data.total_categories || 0;
                document.getElementById("totalUsers").innerText = data.data.total_users || 0;
            }
        })
        .catch(error => console.error("Error loading dashboard stats:", error));

    fetch("http://localhost/Company-Inventory-Management-System/backend/api/get_products.php?limit=5")
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load recent products");
            }
            return res.json();
        })
        .then(data => {
            const table = document.getElementById("productTable");
            table.innerHTML = "";

            if (data.data && data.data.length > 0) {
                data.data.forEach(p => {
                    table.innerHTML += `
                        <tr>
                            <td>${p.name}</td>
                            <td>${p.price}</td>
                            <td>${p.stock}</td>
                            <td>${p.category_name || '-'}</td>
                        </tr>
                    `;
                });
            } else {
                table.innerHTML = '<tr><td colspan="4" class="text-center">No recent products found.</td></tr>';
            }
        })
        .catch(error => {
            console.error("Error loading recent products:", error);
            const table = document.getElementById("productTable");
            table.innerHTML = '<tr><td colspan="4" class="text-center">Error loading products.</td></tr>';
        });
//calling chart function in
    loadCategoryStockChart();
}
// function for adding chart in dashboard
function loadCategoryStockChart() {
    fetch("http://localhost/Company-Inventory-Management-System/backend/api/get_products.php?page=1&limit=100000")
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load products for chart");
            }
            return res.json();
        })
        .then(data => {
            const products = Array.isArray(data.data) ? data.data : [];
            const stockByCategory = {};

            products.forEach(product => {
                const category = (product.category_name && product.category_name.trim())
                    ? product.category_name.trim()
                    : "Uncategorized";
                const stock = Number(product.stock) || 0;
                stockByCategory[category] = (stockByCategory[category] || 0) + stock;
            });

            const labels = Object.keys(stockByCategory);
            const values = labels.map(label => stockByCategory[label]);
            const maxValue = values.length ? Math.max(...values) : 0;
            const yMax = Math.max(1000, Math.ceil(maxValue / 1000) * 1000);
            const stepSize = Math.max(100, Math.ceil(yMax / 8 / 100) * 100);
            const canvas = document.getElementById("categoryStockChart");

            if (!canvas) {
                return;
            }

            if (categoryStockChart) {
                categoryStockChart.destroy();
            }

            if (labels.length === 0) {
                const chartContext = canvas.getContext("2d");
                chartContext.clearRect(0, 0, canvas.width, canvas.height);
                chartContext.font = "16px sans-serif";
                chartContext.textAlign = "center";
                chartContext.fillText("No product data available for chart.", canvas.width / 2, 40);
                return;
            }

            categoryStockChart = new Chart(canvas, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Total Stock",
                        data: values,
                        backgroundColor: [
                            "rgba(54, 162, 235, 0.7)",
                            "rgba(255, 99, 132, 0.7)",
                            "rgba(255, 206, 86, 0.7)",
                            "rgba(75, 192, 192, 0.7)",
                            "rgba(153, 102, 255, 0.7)",
                            "rgba(255, 159, 64, 0.7)"
                        ],
                        borderColor: [
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: yMax,
                            ticks: {
                                stepSize: stepSize,
                                callback: function (value) {
                                    if (value >= 1000) {
                                        return (value / 1000) + "k";
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error loading chart data:", error);
        });
}