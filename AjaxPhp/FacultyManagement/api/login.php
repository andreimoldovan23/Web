<?php require("corsConfig.php");

configureCors();

$name = $_GET["name"];
$pwd = $_GET["password"];
$isTeacher = $_GET["isTeacher"];

session_start();
if (strcmp($isTeacher, "true") == 0) {
    $_SESSION["userType"] = "teacher";
} else {
    $_SESSION["userType"] = "student";
}
$_SESSION["createdAt"] = time();
$_SESSION["LAST_ACTIVITY"] = $_SESSION["createdAt"];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facultymanagement";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM ";
$sql .= $_SESSION["userType"];
$sql .= " where name = ? and password = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $pwd);
$stmt->execute();
$stmt->bind_result($id);
$stmt->fetch();

$_SESSION["id"] = $id;

echo json_encode(new StdClass());

$stmt->close();
$conn->close();
?>





