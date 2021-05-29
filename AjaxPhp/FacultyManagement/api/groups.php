<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facultymanagement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT s.groupNo from student s";

$stmt = $conn->prepare($sql);
$stmt->execute();
$stmt->bind_result($group);

$groups = array();

while($stmt->fetch()) {
    $data = new StdClass();
    $data->group = $group;
    array_push($groups, $data);
}

echo json_encode($groups);

$stmt->close();
$conn->close();
?>