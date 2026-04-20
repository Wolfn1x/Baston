<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "baston_db");

$raw = file_get_contents("php://input");
// $data = json_decode($raw, true);

$idDispositivo = $_POST["idDispositivo"] ?? "";
$latitud = $_POST["latitud"] ?? 0;
$longitud = $_POST["longitud"] ?? 0;

if (empty($idDispositivo)) {
    http_response_code(400); // Enviamos un error real
    echo json_encode(["ok" => false, "error" => "Falta el idDispositivo"]);
    exit;
}

$sql = "SELECT id FROM ultima_posicion_dispositivo WHERE idDispositivo ='$idDispositivo'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $sqlUpdate = "UPDATE ultima_posicion_dispositivo SET latitud = $latitud, longitud = $longitud WHERE idDispositivo = '$idDispositivo'";
    
    if (mysqli_query($conn, $sqlUpdate)) {
        echo json_encode(["ok" => true, "mensaje" => "Posición actualizada"]);
    } else {
        http_response_code(500);
        echo json_encode(["ok" => false, "error" => mysqli_error($conn)]);
    }
} else {
    // Si el dispositivo no existe en la tabla, lo insertamos o avisamos
    http_response_code(404); // Not Found
    echo json_encode([
        "ok" => false, 
        "mensaje" => "El dispositivo $idDispositivo no existe en la BD",
        "debug" => ["id" => $idDispositivo, "lat" => $latitud, "lon" => $longitud]
    ]);
}

mysqli_close($conn);
?>