function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost/Company-Inventory-Management-System/backend/api/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.text()) 
    .then(text => {
        console.log("RAW RESPONSE:", text); 

        let data = JSON.parse(text); 

        alert(data.message);

        if (data.status === "success") {
            window.location.href = "login.html";
        }
    })
    .catch(err => {
        console.error("ERROR:", err);
    });
}