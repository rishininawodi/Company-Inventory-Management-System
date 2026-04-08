

<?php
$conn = new mysqli("localhost", "root", "", "company_inventorydb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

