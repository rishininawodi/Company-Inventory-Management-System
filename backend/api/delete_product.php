<?php
header("Content-Type: application/json");
include "../config/db.php";

$id = $_GET['id'];


$conn->query("DELETE FROM product_images WHERE product_id=$id");

// Delete product
$sql = "DELETE FROM products WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Product deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Delete failed"]);
}
?>