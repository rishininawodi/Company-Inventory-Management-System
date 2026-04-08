function logout(event) {
    if (event) {
        event.preventDefault();
    }

    fetch("http://localhost/Company-Inventory-Management-System/backend/api/logout.php")
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            localStorage.removeItem("user");
            window.location.href = "login.html";
        })
        .catch(() => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
}