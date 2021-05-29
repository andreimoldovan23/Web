<?php

$sid = $_POST["sid"];
$cid = $_POST["cid"];
$grade = $_POST["grade"];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facultymanagement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO enrolment (student_id, course_id, grade) values (?,?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $sid, $cid, $grade);
$stmt->execute();

$stmt->close();
$conn->close();
?>