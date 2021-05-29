<?php

$name = $_GET["name"];
$pwd = $_GET["password"];
$isTeacher = $_GET["isTeacher"];
$tableName = "";

if (strcmp($isTeacher, "true") == 0) {
    $tableName = "teacher";
} else {
    $tableName = "student";
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facultymanagement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM ";
$sql .= $tableName;
$sql .= " where name = ? and password = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $pwd);
$stmt->execute();
$stmt->bind_result($id);
$stmt->fetch();

echo json_encode($id);

$stmt->close();
$conn->close();
?>





