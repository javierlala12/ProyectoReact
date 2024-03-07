import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { peticionGET, peticionPUT } from "../utils/ajax";
import { useNavigate, useParams } from "react-router-dom";

function EditarRegistroMantenimiento() {
  const navigate = useNavigate();
  const {idregistroMantenimiento } = useParams();
  const [registroMantenimientos, setregistroMantenimientos] = useState({ nombre: "", descripcion: "", precio: "", idvehiculo: ""});
  useEffect(() => {
    async function fetchData() {
      let parametros = new FormData();
      let respuesta = await peticionGET("/registroMantenimientos/" + idregistroMantenimiento, parametros);
      if (respuesta.ok) {
        const datos = respuesta.datos;
        setregistroMantenimientos(datos);
      }
    }
    fetchData();
  }, [idregistroMantenimiento]);
  const handleNombre = (event) => {
    setregistroMantenimientos({ ...registroMantenimientos, nombre: event.target.value });
  };
  const handleDescripcion = (event) => {
    setregistroMantenimientos({ ...registroMantenimientos, descripcion: event.target.value });
  };
  const handlePrecio = (event) => {
    setregistroMantenimientos({ ...registroMantenimientos, precio: event.target.value });
  };
  const handleVehiculoChange = (event) => {
    setregistroMantenimientos({...registroMantenimientos, idvehiculo: event.target.value});
  };
  const handleGuardar = async () => {
    let oregistroMantenimientos = {
      idregistroMantenimiento: idregistroMantenimiento,
      nombre: registroMantenimientos.nombre,
      descripcion: registroMantenimientos.descripcion,
      precio: registroMantenimientos.precio,
      idvehiculo: registroMantenimientos.idvehiculo,
    };
    let respuesta = await peticionPUT("/registroMantenimientos/" + idregistroMantenimiento, oregistroMantenimientos);
    if (respuesta.ok) {
      alert("registroMantenimientos Actualizada correctamente");
      navigate("/");
    } else {
      alert("Error al actualizar el registroMantenimientos");
      navigate("/listadoregistroMantenimiento");
    }
  };
  return (
    <>
      <h1>Editor de registroMantenimientoss</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            value={registroMantenimientos.nombre}
            onChange={handleNombre}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción"
            value={registroMantenimientos.descripcion}
            onChange={handleDescripcion}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Precio"
            value={registroMantenimientos.precio}
            onChange={handlePrecio}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Vehiculo"
            value={registroMantenimientos.idvehiculo}
            onChange={handleVehiculoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained" color="primary" onClick={handleGuardar}>
              Guardar
            </Button>
        
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default EditarRegistroMantenimiento;