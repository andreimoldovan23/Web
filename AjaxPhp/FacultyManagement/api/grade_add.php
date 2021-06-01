<?php require("helper.php");  require("corsConfig.php");

configureCors();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case 'POST':
    session_start();

    if (invalidateSession()) {
      http_response_code(401);
    } else {
      renewSession();
    }

    if (checkIfTeacher()) {
      $sid = $_GET["sid"];
      $cid = $_GET["cid"];
      $grade = $_GET["grade"];

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

      echo json_encode(new StdClass());
    } else {
      http_response_code(404);
    }
    break;
}
?>