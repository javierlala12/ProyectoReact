<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idregistroMantenimiento = $_POST['idregistroMantenimiento'];

// SQL
$sql = "SELECT c.*, p.descripcion AS vehiculodesc FROM registroMantenimiento c, vehiculo p 
WHERE c.idvehiculo = p.idvehiculo 
AND idregistroMantenimiento = $idregistroMantenimiento;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el registroMantenimiento", $conexion);
}

