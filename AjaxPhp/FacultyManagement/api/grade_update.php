<?php require("helper.php");  require("corsConfig.php");

configureCors();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case 'PUT':
    session_start();

    if (invalidateSession()) {
        http_response_code(401);
    } else {
        renewSession();
    }

    if (checkIfTeacher()) {
        $enrolId = $_GET["enrolId"];
        $grade = $_GET["grade"];

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

        echo json_encode(new StdClass());
    } else {
        http_response_code(404);
    }
    break;
}
?>