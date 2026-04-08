document.addEventListener("DOMContentLoaded", function () {
    const existingUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (existingUser) {
        window.location.href = "dashboard.html";
        return;
    }

    const savedEmail = localStorage.getItem("remember_me_email");
    const emailInput = document.getElementById("email");
    const rememberInput = document.getElementById("rememberMe");

    if (savedEmail && emailInput && rememberInput) {
        emailInput.value = savedEmail;
        rememberInput.checked = true;
    }
});

function login() {
    const email = (document.getElementById("email").value || "").trim();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe")?.checked;

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
            const userJson = JSON.stringify(data.user);
            if (rememberMe) {
                localStorage.setItem("user", userJson);
                sessionStorage.removeItem("user");
                localStorage.setItem("remember_me_email", email);
            } else {
                sessionStorage.setItem("user", userJson);
                localStorage.removeItem("user");
                localStorage.removeItem("remember_me_email");
            }

            // Redirect to dashboard if successful
            window.location.href = "dashboard.html";
        }
    })
    .catch(() => {
        alert("Login request failed");
    });
}