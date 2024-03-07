<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$registroMantenimiento = json_decode($_POST['registroMantenimiento']);

$sql = "UPDATE registroMantenimiento
SET nombre = '" . $registroMantenimiento->nombre . "', 
descripcion = '" .  $registroMantenimiento->descripcion . "', 
precio = $registroMantenimiento->precio, 
idvehiculo = $registroMantenimiento->idvehiculo 
WHERE idregistroMantenimiento = $registroMantenimiento->idregistroMantenimiento ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Protovehiculo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el registroMantenimiento", $conexion);
}
?>
