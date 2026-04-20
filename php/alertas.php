<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "baston_db");
$limit = $_GET["limit"] ?? 50;

$sql = "SELECT * FROM alertas ORDER BY fecha_hora DESC LIMIT $limit";
$result = mysqli_query($conn, $sql);

$alertas = [];
while ($row = mysqli_fetch_assoc($result)) {
    $alertas[] = $row;
}

echo json_encode($alertas);
mysqli_close($conn);
?>