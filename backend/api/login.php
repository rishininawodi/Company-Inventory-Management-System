<?php
session_start();
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;


$query = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {

        $_SESSION['user'] = $user;

        echo json_encode([
            "message" => "Login successful",
            "user" => $user
        ]);

    } else {
        echo json_encode(["message" => "Invalid password"]);
    }
} else {
    echo json_encode(["message" => "User not found"]);
}
?>