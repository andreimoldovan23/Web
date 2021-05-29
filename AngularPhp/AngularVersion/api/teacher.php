<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$id = $_GET["id"];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facultymanagement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, mail, website, rank FROM teacher where id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($teacherName, $teacherMail, $teacherSite, $teacherRank);
$stmt->fetch();

$teacher = new StdClass();
$teacher->name = $teacherName;
$teacher->mail = $teacherMail;
$teacher->site = $teacherSite;
$teacher->rank = $teacherRank;

echo json_encode($teacher);

$stmt->close();
$conn->close();
?>