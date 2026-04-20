<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "baston_db");

$sql = "SELECT tipo_alerta, COUNT(*) as total FROM alertas GROUP BY tipo_alerta";
$result = mysqli_query($conn, $sql);

$stats = [];
while ($row = mysqli_fetch_assoc($result)) {
    $stats[$row["tipo_alerta"]] = (int)$row["total"];
}

$sqlUbicacion = "SELECT latitud, longitud, fecha_hora FROM alertas WHERE latitud != 0 ORDER BY fecha_hora DESC LIMIT 1";
$resUbicacion = mysqli_query($conn, $sqlUbicacion);
$ubicacion = mysqli_fetch_assoc($resUbicacion);

echo json_encode([
    "conteo" => $stats,
    "ubicacion" => $ubicacion
]);
mysqli_close($conn);
?>