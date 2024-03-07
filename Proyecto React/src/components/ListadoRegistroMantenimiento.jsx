import { Button, Grid, Typography } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { peticionGET } from "../utils/ajax";
import { Link } from "react-router-dom";

function ListadoRegistroMantenimiento() {
  const [datosListado, setDatosListado] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let parametros = new FormData();
      parametros.append("listado", "true");

      let respuesta = await peticionGET("/registroMantenimientos", parametros);

      if (respuesta.ok) {
        const datos = respuesta.datos;

        setDatosListado(datos);
      }
    }

    fetchData();
  }, []); 

  return (
    <>
      <Grid container sx={{ px: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
          Listado de Registro de Mantenimientos
        </Typography>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">IDREGISTRO</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">DESCRIPCIÓN</th>
              <th scope="col">PRECIO</th>
              <th scope="col">VEHICULO</th>
              <th scope="col">BORRAR</th>
              <th scope="col">EDITAR</th> 
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {datosListado.map((fila) => (
              <tr key={fila.idregistroMantenimiento}>
                <Link to={"/ficharegistroMantenimiento/" + fila.idregistroMantenimiento}><td>{fila.idregistroMantenimiento}</td></Link>
                <td>{fila.nombre}</td>
                <td>{fila.descripcion}</td>
                <td>{fila.precio}</td>
                <td>{fila.vehiculo}</td>
                <td>
                  {
                    <Link to={"/borrarregistroMantenimiento/" + fila.idregistroMantenimiento}>
                      <Button variant="contained" color="error">Borrar</Button>
                    </Link>
                  }
                </td>
                <td>
                  {
                    <Link to={"/editarregistroMantenimiento/" + fila.idregistroMantenimiento}>
                      <Button variant="contained">Editar</Button>
                    </Link>
                  }
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Grid>
    </>
  );
}

export default ListadoRegistroMantenimiento;
