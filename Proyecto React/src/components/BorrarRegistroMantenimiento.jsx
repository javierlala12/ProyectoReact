import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { peticionDELETE} from "../utils/ajax";
import { useNavigate } from "react-router-dom";


function BorrarRegistroMantenimiento() {
    const { idregistroMantenimiento } = useParams();
      
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchData() {
        let parametros = new FormData();
        parametros.append("relations", "true");
  
        let respuesta = await peticionDELETE(
          "/registroMantenimientos/" + idregistroMantenimiento,
          parametros
        );
  
        if (respuesta.ok) {
            alert("Borrado correcto del componente con id: "+idregistroMantenimiento);
            navigate("/");
          
        }
      }
  
      fetchData();
    },); 


  return (
    <>
    </>
  );
}
export default BorrarRegistroMantenimiento;