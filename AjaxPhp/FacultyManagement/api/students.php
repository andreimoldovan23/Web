<?php

$id = $_GET["id"];
$group = $_GET["group"];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facultymanagement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT s.name, c.name, s.id, c.id from teacher t
    INNER JOIN course c on c.teacher_id = t.id
    INNER JOIN enrolment e on e.course_id = c.id
    INNER JOIN student s on s.id = e.student_id
    WHERE t.id = ? and s.groupNo = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $group);
$stmt->execute();
$stmt->bind_result($studentName, $courseName, $studentId, $courseId);

$students = array();

while($stmt->fetch()) {
    $data = new StdClass();
    $data->studentName = $studentName;
    $data->course = $courseName;
    $data->sid = $studentId;
    $data->cid = $courseId;
    array_push($students, $data);
}

echo json_encode($students);

$stmt->close();
$conn->close();
?>