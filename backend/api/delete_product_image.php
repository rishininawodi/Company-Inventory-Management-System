<?php
header("Content-Type: application/json");
include "../config/db.php";

$product_id = isset($_POST['product_id']) ? (int)$_POST['product_id'] : 0;
$image_path = isset($_POST['image_path']) ? trim($_POST['image_path']) : '';

if ($product_id <= 0 || $image_path === '') {
    echo json_encode(["success" => false, "message" => "Invalid image delete request"]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM product_images WHERE product_id = ? AND image_path = ? LIMIT 1");
$stmt->bind_param("is", $product_id, $image_path);

if ($stmt->execute()) {
    $file = __DIR__ . "/../../uploads/" . $image_path;
    if (file_exists($file)) {
        @unlink($file);
    }

    echo json_encode(["success" => true, "message" => "Image deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete image"]);
}
?>
