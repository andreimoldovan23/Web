<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: PUT");

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case 'PUT':
    $enrolId = $_GET["enrolId"];
    $grade = $_GET["grade"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "facultymanagement";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE enrolment SET grade = ? where id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $grade, $enrolId);
    $stmt->execute();

    $stmt->close();
    $conn->close();
    break;
}
?>