<?php

function configureCors() {
    header('Access-Control-Allow-Origin: http://localhost:4200');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-type: application/json');
    header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET, OPTIONS");
    header('Access-Control-Allow-Credentials: true');

    if (strcmp($_SERVER["REQUEST_METHOD"], "OPTIONS") == 0) {
        http_response_code(200);
        die();
    }
}

?>