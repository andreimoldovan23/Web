<?php

$enrolId = $_POST["enrolId"];
$grade = $_POST["grade"];

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
?>