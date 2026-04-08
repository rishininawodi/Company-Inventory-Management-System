<?php
include "../config/db.php";


$search = isset($_GET['search']) ? $_GET['search'] : "";
$category = isset($_GET['category']) ? $_GET['category'] : "";
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;
$page = $page > 0 ? $page : 1;
$limit = $limit > 0 ? $limit : 5;
$offset = ($page - 1) * $limit;

$sort = isset($_GET['sort']) ? $_GET['sort'] : "id";
$order = isset($_GET['order']) ? $_GET['order'] : "DESC";

$allowedSortColumns = ["id", "name", "price", "stock", "created_at"];
if (!in_array($sort, $allowedSortColumns, true)) {
    $sort = "id";
}

$order = strtoupper($order) === "ASC" ? "ASC" : "DESC";


$sql = "SELECT p.*
    FROM products p
    WHERE 1=1";


if (!empty($search)) {
    $sql .= " AND p.name LIKE '%$search%'";
}


if (!empty($category)) {
    $safeCategory = $conn->real_escape_string(trim($category));
    $sql .= " AND TRIM(LOWER(p.category_name)) = TRIM(LOWER('" . $safeCategory . "'))";
}


$sql .= " ORDER BY p.$sort $order";


$sql .= " LIMIT $limit OFFSET $offset";

$result = $conn->query($sql);

$products = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {

        $id = $row['id'];

        $img_result = $conn->query("SELECT image_path FROM product_images WHERE product_id=$id");

        $images = [];
        while ($img = $img_result->fetch_assoc()) {
            $images[] = $img['image_path'];
        }

        $row['images'] = $images;

        $products[] = $row;
    }
}


$count_sql = "SELECT COUNT(*) as total FROM products WHERE 1=1";

if (!empty($search)) {
    $count_sql .= " AND name LIKE '%$search%'";
}

if (!empty($category)) {
    $safeCategory = $conn->real_escape_string(trim($category));
    $count_sql .= " AND TRIM(LOWER(category_name)) = TRIM(LOWER('" . $safeCategory . "'))";
}

$count_result = $conn->query($count_sql);
$total = $count_result->fetch_assoc()['total'];

echo json_encode([
    "data" => $products,
    "total" => $total,
    "page" => $page,
    "limit" => $limit
]);
?>