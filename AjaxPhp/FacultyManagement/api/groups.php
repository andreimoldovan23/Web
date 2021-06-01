<?php require("helper.php");  require("corsConfig.php");

configureCors();

session_start();

if (invalidateSession()) {
    http_response_code(401);
} else {
    renewSession();
}

if (checkIfTeacher()) {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "facultymanagement";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT DISTINCT groupNo FROM student s
    inner join enrolment e on e.student_id = s.id
    inner join course c on c.id = e.course_id
    inner join teacher t on t.id = c.teacher_id
    WHERE t.id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_SESSION["id"]);
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
} else {
    http_response_code(403);
}
?>