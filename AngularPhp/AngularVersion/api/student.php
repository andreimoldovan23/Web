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

    $sql = "SELECT name, mail, groupNo FROM student where id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $_SESSION["id"]);
    $stmt->execute();
    $stmt->bind_result($studentName, $studentMail, $studentGroup);
    $stmt->fetch();

    $student = new StdClass();
    $student->name = $studentName;
    $student->mail = $studentMail;
    $student->groupNo = $studentGroup;

    echo json_encode($student);

    $stmt->close();
    $conn->close();
} else {
    http_response_code(404);
}
?>