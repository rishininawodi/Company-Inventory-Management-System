function logout(event) {
    if (event) {
        //prevent default browser behavior to handle logout manually
        event.preventDefault();
    }

    fetch("http://localhost/Company-Inventory-Management-System/backend/api/logout.php")
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            //clear storage
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            window.location.href = "login.html";
        })
        .catch(() => {
            //logs out user even if server fails also
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            window.location.href = "login.html";
        });
}