<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$idvehiculo = $_GET['idvehiculo'];

// SQL
$sql = "SELECT c.*, t.vehiculo FROM registroMantenimiento as c, vehiculo as t 
WHERE c.idvehiculo = t.idvehiculo 
AND c.idvehiculo = $idvehiculo;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);