<?php
header("Content-Type: application/json");
include "../config/db.php";

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if ($id <= 0 || $name === '' || $email === '') {
    echo json_encode(["success" => false, "message" => "Name, email and user id are required"]);
    exit();
}

$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1");
$checkStmt->bind_param("si", $email, $id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult && $checkResult->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already in use"]);
    exit();
}

$newImageName = null;
if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . "/../../uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $extension = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
    $newImageName = "profile_" . $id . "_" . time() . ($extension ? "." . $extension : "");
    $targetPath = $uploadDir . $newImageName;

    if (!move_uploaded_file($_FILES['profile_image']['tmp_name'], $targetPath)) {
        echo json_encode(["success" => false, "message" => "Failed to upload profile image"]);
        exit();
    }
}

$setParts = ["name = ?", "email = ?"];
$params = [$name, $email];
$types = "ss";

if ($password !== '') {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $setParts[] = "password = ?";
    $params[] = $hashedPassword;
    $types .= "s";
}

if ($newImageName !== null) {
    $setParts[] = "profile_image = ?";
    $params[] = $newImageName;
    $types .= "s";
}

$sql = "UPDATE users SET " . implode(", ", $setParts) . " WHERE id = ?";
$params[] = $id;
$types .= "i";

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);

if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to update profile"]);
    exit();
}

$getStmt = $conn->prepare("SELECT id, name, email, role, profile_image, created_at FROM users WHERE id = ? LIMIT 1");
$getStmt->bind_param("i", $id);
$getStmt->execute();
$updatedUser = $getStmt->get_result()->fetch_assoc();

echo json_encode(["success" => true, "message" => "Profile updated successfully", "data" => $updatedUser]);
?>
