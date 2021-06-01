<?php require("corsConfig.php");

configureCors();

session_start();
session_unset();
session_destroy();

echo json_encode(new StdClass());
?>