<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}
?>

<h2>Welcome <?php echo $_SESSION['user']['name']; ?></h2>