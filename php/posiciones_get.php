<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "baston_db");

// $raw = file_get_contents("php://input");
// $data = json_decode($raw, true);
$idDispositivo  = $_POST["idDispositivo"] ?? "";

$sql = "SELECT latitud, longitud FROM ultima_posicion_dispositivo WHERE idDispositivo = '$idDispositivo'";
$result = mysqli_query($conn, $sql);
// die(print_r($sql));

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["ok" => true, "data" => mysqli_fetch_assoc($result)]);
} else {
    echo json_encode(["ok" => false, "debug" => ["idDispositivo" => $idDispositivo]]);
}
mysqli_close($conn);
?>