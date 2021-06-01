<?php require("helper.php");  require("corsConfig.php");

configureCors();

session_start();

if (invalidateSession()) {
    http_response_code(401);
} else {
    renewSession();
}

if (checkIfTeacher()) {
    $sid = $_GET["sid"];
    $cid = $_GET["cid"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "facultymanagement";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT e.grade, e.id from student s
        INNER JOIN enrolment e on s.id = e.student_id
        INNER JOIN course c on e.course_id = c.id
        WHERE e.student_id = ? and e.course_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $sid, $cid);
    $stmt->execute();
    $stmt->bind_result($grade, $enrolId);

    $grades = array();

    while($stmt->fetch()) {
        $data = new StdClass();
        $data->grade = $grade;
        $data->enrolId = $enrolId;
        array_push($grades, $data);
    }

    echo json_encode($grades);

    $stmt->close();
    $conn->close();
} else {
    http_response_code(404);
}
?>