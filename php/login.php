<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "baston_db");

// $raw = file_get_contents("php://input");
// $data = json_decode($raw, true);
$usuario = $_POST["usuario"] ?? "";
$password = $_POST["password"] ?? "";

$sql = "SELECT id FROM usuarios WHERE username='$usuario' AND password_hash='$password' AND activo=1";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "debug" => ["usuario" => $usuario, "password" => $password]]);
}
mysqli_close($conn);
?>