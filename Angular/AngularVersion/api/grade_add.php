<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case 'POST':
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "facultymanagement";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sid = $_GET["sid"];
    $cid = $_GET["cid"];
    $grade = $_GET["grade"];
    
    $sql = "INSERT INTO enrolment (student_id, course_id, grade) values (?,?,?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $sid, $cid, $grade);
    $stmt->execute();
    
    $stmt->close();
    $conn->close();
    break;
}
?>