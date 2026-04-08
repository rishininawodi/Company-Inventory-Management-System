<?php
include "../config/db.php";

$name = $_POST['name'];
$price = $_POST['price'];
$stock = $_POST['stock'];
$category_name = $_POST['category_name'];

// Insert into products 
$sql = "INSERT INTO products (name, price, stock, category_name)
        VALUES ('$name', '$price', '$stock', '$category_name')";

if ($conn->query($sql)) {

    $product_id = $conn->insert_id;

    // Upload image
    $uploadDir = __DIR__ . "/../../uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $imageName = basename($_FILES['image']['name']);
    $target = $uploadDir . $imageName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {

        // Insert into product_images table
        $sql2 = "INSERT INTO product_images (product_id, image_path)
                 VALUES ('$product_id', '$imageName')";

        $conn->query($sql2);

        echo json_encode(["message" => "Product added successfully"]);

    } else {
        echo json_encode(["message" => "Image upload failed"]);
    }

} else {
    echo json_encode(["message" => "Product insert failed"]);
}
?>