<?php

function renewSession() {
    if (isset($_SESSION["createdAt"]) && (time() - $_SESSION["createdAt"] > 900)) {
        session_regenerate_id();
        $_SESSION["createdAt"] = time();
        return true;
    }
    return false;
}

function invalidateSession() {
    if (isset($_SESSION["LAST_ACTIVITY"]) && (time() - $_SESSION["LAST_ACTIVITY"] > 1800)) {
        session_unset();
        session_destroy();
        return true;
    }
    return false;
}

function checkIfStudent() {
    return isset($_SESSION["userType"]) && strcmp($_SESSION["userType"], "student") == 0;
}

function checkIfTeacher() {
    return isset($_SESSION["userType"]) && strcmp($_SESSION["userType"], "teacher") == 0;
}

?>