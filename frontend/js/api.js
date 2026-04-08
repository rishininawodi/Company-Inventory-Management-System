fetch("http://localhost/Company-Inventory-Management-System/backend/api/logout.php")
.then(res => res.json())
.then(data => {
    alert(data.message);
    window.location.href = "login.html";
});