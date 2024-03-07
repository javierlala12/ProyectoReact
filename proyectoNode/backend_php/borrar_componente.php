<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idregistroMantenimiento = $_POST['idregistroMantenimiento'];

// SQL
$sql = "DELETE FROM registroMantenimiento WHERE idregistroMantenimiento = $idregistroMantenimiento;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

