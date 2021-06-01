<?php require("helper.php");  require("corsConfig.php");

configureCors();

session_start();

$userType = $_GET["userType"];

$data = new StdClass();

if (invalidateSession()) {
    $data->authenticated = false;
} else {
    renewSession();
    $data->authenticated = strcmp($_SESSION["userType"], $userType) == 0 ? true : false;
}

echo json_encode($data);

?>
