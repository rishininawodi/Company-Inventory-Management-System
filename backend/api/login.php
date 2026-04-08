<?php
session_start();
include "../config/db.php";

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Find user by email
$query = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Check password
    if (password_verify($password, $user['password'])) {

        // Store session
        $_SESSION['user'] = $user;

        // Send only required data
        echo json_encode([
            "message" => "Login successful",
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]
        ]);

    } else {
        echo json_encode(["message" => "Invalid password"]);
    }

} else {
    echo json_encode(["message" => "User not found"]);
}
?>