function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost/Company-Inventory-Management-System/backend/api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        if (data.message === "Login successful") {
            // Store user data in browser(localstorage)
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to dashboard if successful
            window.location.href = "dashboard.html";
        }
    });
}