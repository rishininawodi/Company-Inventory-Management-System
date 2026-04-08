<?php
include "../config/db.php";

$id = $_POST['id'];
$name = $_POST['name'];
$price = $_POST['price'];
$stock = $_POST['stock'];
$category_name = $_POST['category_name'];

$sql = "UPDATE products 
    SET name='$name', price='$price', stock='$stock', category_name='$category_name'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Product updated successfully"]);
} else {
    echo json_encode(["message" => "Update failed"]);
}
?>