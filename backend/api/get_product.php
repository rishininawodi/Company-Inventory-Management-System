<?php
include "../config/db.php";

$product_id = $_GET['id'];


$sql = "SELECT p.*
    FROM products p
    WHERE p.id = $product_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();

    // Get images
    $images = [];
    $img_sql = "SELECT image_path FROM product_images WHERE product_id = $product_id";
    $img_result = $conn->query($img_sql);

    while ($row = $img_result->fetch_assoc()) {
        $images[] = $row['image_path'];
    }

    $product['images'] = $images;

    echo json_encode($product);

} else {
    echo json_encode(["message" => "Product not found"]);
}
?>