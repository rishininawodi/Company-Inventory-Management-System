<?php
header("Content-Type: application/json");
include "../config/db.php";

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$email = isset($_GET['email']) ? trim($_GET['email']) : '';

if ($id <= 0 && $email === '') {
    echo json_encode(["success" => false, "message" => "User identifier is required"]);
    exit();
}

if ($id > 0) {
    $stmt = $conn->prepare("SELECT id, name, email, role, profile_image, created_at FROM users WHERE id = ? LIMIT 1");
    $stmt->bind_param("i", $id);
} else {
    $stmt = $conn->prepare("SELECT id, name, email, role, profile_image, created_at FROM users WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["success" => true, "data" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}
?>
