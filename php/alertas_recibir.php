<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "baston_db");

if (!$conn) {
    echo json_encode(["ok" => false, "error" => mysqli_connect_error()]);
    exit;
}

// $data = json_decode(file_get_contents("php://input"), true);

$tipo = $_POST["tipo_alerta"] ?? "";
$dist = $_POST["distancia_cm"] ?? 0;
$lat  = $_POST["latitud"] ?? 0;
$lon  = $_POST["longitud"] ?? 0;
$bat  = $_POST["bateria_pct"] ?? 100;
$disp_id = 1;

$sql = "INSERT INTO alertas (tipo_alerta, distancia_cm, latitud, longitud, bateria_pct, dispositivo_id) 
        VALUES ('$tipo', $dist, $lat, $lon, $bat, $disp_id)";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "ok" => true, 
        "msg" => "Guardado desde ESP32",
        "tipo_recibido" => $tipo
    ]);
} else {
    echo json_encode([
        "ok" => false, 
        "error" => mysqli_error($conn)
    ]);
}
mysqli_close($conn);
?>