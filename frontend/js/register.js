
//This is run when registe.htm register button click
function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    //sending http request to backend
    fetch("http://localhost/Company-Inventory-Management-System/backend/api/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //convert javascript object to JASON stirng
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.text()) 
    .then(text => {
        //convert text to javascript object
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