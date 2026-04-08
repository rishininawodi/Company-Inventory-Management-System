<?php
header("Content-Type: application/json");
include "../config/db.php";

$response = ["success" => false, "data" => []];

$result = $conn->query("SELECT name FROM categories UNION SELECT category_name AS name FROM products WHERE category_name IS NOT NULL AND category_name <> '' ORDER BY name ASC");

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $response["data"][] = ["name" => $row["name"]];
    }
    $response["success"] = true;
} else {
    $response["message"] = "Failed to fetch categories";
}

echo json_encode($response);
?>
