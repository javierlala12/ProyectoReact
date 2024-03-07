<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$vehiculo = $_POST['vehiculo'];
$descripcion = $_POST['descripcion'];

$sql = "INSERT INTO vehiculo VALUES (null,'$vehiculo','$descripcion');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Protovehiculo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el vehiculo de registroMantenimiento", $conexion);
}
?>
