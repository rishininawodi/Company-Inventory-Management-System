<?php
header("Content-Type: application/json");
include "../config/db.php";

$response = ['success' => false, 'data' => []];

function fetchCountValue($conn, $sql, $fieldName) {
	$result = $conn->query($sql);
	if (!$result) {
		return 0;
	}

	$row = $result->fetch_assoc();
	return isset($row[$fieldName]) && $row[$fieldName] !== null ? (int)$row[$fieldName] : 0;
}

// Total products
$response['data']['total_products'] = fetchCountValue($conn, "SELECT COUNT(*) as total FROM products", 'total');

// Total stock
$response['data']['total_stock'] = fetchCountValue($conn, "SELECT SUM(stock) as totalStock FROM products", 'totalStock');

// Total categories 
$response['data']['total_categories'] = fetchCountValue($conn, "SELECT COUNT(DISTINCT category_name) as total FROM products WHERE category_name IS NOT NULL AND category_name != ''", 'total');

// Total users
$response['data']['total_users'] = fetchCountValue($conn, "SELECT COUNT(*) as total FROM users", 'total');

$response['success'] = true;

echo json_encode($response);
?>