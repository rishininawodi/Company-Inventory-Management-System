<?php
header("Content-Type: application/json");
include "../config/db.php";

$product_id = isset($_POST['product_id']) ? (int)$_POST['product_id'] : 0;

if ($product_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid product id"]);
    exit();
}

if (!isset($_FILES['images'])) {
    echo json_encode(["success" => false, "message" => "No images provided"]);
    exit();
}

$uploadDir = __DIR__ . "/../../uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$uploadedCount = 0;
$names = $_FILES['images']['name'];
$tmpNames = $_FILES['images']['tmp_name'];
$errors = $_FILES['images']['error'];

for ($i = 0; $i < count($names); $i++) {
    if ($errors[$i] !== UPLOAD_ERR_OK) {
        continue;
    }

    $baseName = basename($names[$i]);
    $imageName = time() . "_" . $i . "_" . preg_replace('/\s+/', '_', $baseName);
    $target = $uploadDir . $imageName;

    if (move_uploaded_file($tmpNames[$i], $target)) {
        $stmt = $conn->prepare("INSERT INTO product_images (product_id, image_path) VALUES (?, ?)");
        $stmt->bind_param("is", $product_id, $imageName);
        $stmt->execute();
        $uploadedCount++;
    }
}

if ($uploadedCount > 0) {
    echo json_encode(["success" => true, "message" => "Images uploaded successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "No images were uploaded"]);
}
?>
