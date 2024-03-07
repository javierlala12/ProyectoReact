import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { peticionGET } from "../utils/ajax";

function FichaRegistroMantenimiento() {
  // Recupero el valor del parámetro de la ruta
  // /ficharegistroMantenimiento/:idregistroMantenimiento
  const { idregistroMantenimiento } = useParams();
  const [datosRegistroMantenimiento, setDatosRegistroMantenimiento] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let parametros = new FormData();
      parametros.append("relations", "true");

      let respuesta = await peticionGET(
        "/registroMantenimientos/" + idregistroMantenimiento,
        parametros
      );

      if (respuesta.ok) {
        const datos = respuesta.datos;

        setDatosRegistroMantenimiento(datos);
      }
    }

    fetchData();
  }, [idregistroMantenimiento]); // Solo se ejecuta en el primer renderizado

  if (datosRegistroMantenimiento == null) return <h1>Datos no cargados</h1>;

  return (
    <>
      <h1>Ficha del registroMantenimiento: {datosRegistroMantenimiento.idregistroMantenimiento}</h1>
      <h5>Nombre: {datosRegistroMantenimiento.nombre}</h5>
      <h5>Descripcion: {datosRegistroMantenimiento.descripcion}</h5>
      <h5>Precio: {datosRegistroMantenimiento.precio}</h5>
      <h5>Vehiculo: {datosRegistroMantenimiento.vehiculo}</h5>
    </>
  );
}

export default FichaRegistroMantenimiento;
