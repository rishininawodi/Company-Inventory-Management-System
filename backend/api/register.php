<?php
//Tell API returns JASON data 
header("Content-Type: application/json");

//import database connection
include("../config/db.php");

//convert incoming JSON data into a PHP array
$data = json_decode(file_get_contents("php://input"), true);

//checking Empty or not
if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON input"
    ]);
    exit;
}
//Getting User data
$name = $data['name'];
$email = $data['email'];
//hash because need secure
$password = password_hash($data['password'], PASSWORD_DEFAULT);

//SQL query for inser  data in to database
$sql = "INSERT INTO users (name, email, password)
        VALUES ('$name', '$email', '$password')";

if ($conn->query($sql)) {
    echo json_encode([
        "status" => "success",
        "message" => "User registered"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}
?>