<?php require("helper.php");  require("corsConfig.php");

configureCors();

session_start();

if (invalidateSession()) {
    http_response_code(401);
} else {
    renewSession();
}

if (checkIfStudent()) {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "facultymanagement";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT c.name, e.grade, t.rank from student s
    INNER JOIN enrolment e on e.student_id = s.id
    INNER JOIN course c on c.id = e.course_id
    INNER JOIN teacher t on t.id = c.teacher_id
    WHERE s.id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_SESSION["id"]);
    $stmt->execute();
    $stmt->bind_result($courseName, $grade, $type);

    $grades = array();

    while($stmt->fetch()) {
        $data = new StdClass();
        $data->courseName = $courseName;
        $data->grade = $grade;
        $data->type = $type;
        array_push($grades, $data);
    }

    echo json_encode($grades);

    $stmt->close();
    $conn->close();
} else {
    http_response_code(404);
}
?>