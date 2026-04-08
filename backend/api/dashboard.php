<?php
session_start();

//check if the user is logged in using session
//To protect the page from unauthorized access
if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}
?>

<h2>Welcome <?php echo $_SESSION['user']['name']; ?></h2>