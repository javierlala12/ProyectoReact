class Vehiculo {
    constructor(idvehiculo, vehiculo, descripcion) {
        this.idvehiculo = idvehiculo;
        this.vehiculo = vehiculo;
        this.descripcion = descripcion;
    }
}

class RegistroMantenimiento {
    constructor(idregistroMantenimiento, nombre, descripcion, precio, idvehiculo) {
        this.idregistroMantenimiento = idregistroMantenimiento;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.idvehiculo = idvehiculo;
        
    }
}

class Empresa {
    async altaVehiculo(oVehiculo) {
        let datos = new FormData();

        datos.append("vehiculo", oVehiculo.vehiculo);
        datos.append("descripcion", oVehiculo.descripcion);

        let respuesta = await peticionPOST("alta_vehiculo.php", datos);

        return respuesta;
    }

    async modificarRegistroMantenimiento(oRegistroMantenimiento) {
        let url = `/registroMantenimientos/${oRegistroMantenimiento.idregistroMantenimiento}`;

    
        let respuesta = await peticionPUT(url, oRegistroMantenimiento);
    
        return respuesta;
    }
    
    async altaRegistroMantenimiento(oRegistroMantenimiento) {
        let datos = new FormData();

        // Se pasa el objeto que se enviará como JSON
        let respuesta = await peticionPOSTJSON("/registroMantenimientos", oRegistroMantenimiento);

        return respuesta;
    }

    async getVehiculos() {
        let datos = new FormData();

        let respuesta = await peticionGET("/vehiculos", datos);

        return respuesta;
    }

    async buscarRegistroMantenimiento(idRegistroMantenimiento) {
        let datos = new FormData();

        datos.append("relations", true); // Petición con datos relacionados

        let respuesta = await peticionGET(`/registroMantenimientos/${idRegistroMantenimiento}`, datos);

        return respuesta;
    }

    async borrarRegistroMantenimiento(idRegistroMantenimiento) {
        
        let respuesta = await peticionDELETE(`/registroMantenimientos/${idRegistroMantenimiento}`);

        return respuesta;
    }

    async listadoVehiculoRegistroMantenimientos() {
        let listado = "";
      
        

        let respuesta = await peticionGET("/vehiculos", new FormData());

        if (! respuesta.ok) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDVEHICULO</th><th>NOMBRE VEHICULO</th><th>DESCRIPCIÓN</th></tr></thead>";
            listado += "<tbody>";

            for (let vehiculo of respuesta.datos) {
                listado += "<tr><td>" + vehiculo.idvehiculo + "</td>";
                listado += "<td>" + vehiculo.vehiculo + "</td>";
                listado += "<td>" + vehiculo.descripcion + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async listadoPorVehiculo(idVehiculo){
        let datos = new FormData();

        let url = `/vehiculos/${idVehiculo}/registroMantenimientos`;
        

        let respuesta = await peticionGET(url, datos);

        return respuesta;
    }

    async listadoRegistroMantenimientos() {
        let listado = "";

        let datos = new FormData();

        datos.append("listado", true);

        let respuesta = await peticionGET("/registroMantenimientos", datos);

        if (! respuesta.ok) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDREGISTRO</th><th>NOMBRE</th><th>DESCRIPCIÓN</th><th>PRECIO</th><th>NOMBRE VEHICULO</th></tr></thead>";
            listado += "<tbody>";
            	
            for (let registroMantenimiento of respuesta.datos) {
                listado += "<tr><td>" + registroMantenimiento.idregistroMantenimiento + "</td>";
                listado += "<td>" + registroMantenimiento.nombre + "</td>";
                listado += "<td>" + registroMantenimiento.descripcion + "</td>";
                listado += "<td>" + registroMantenimiento.precio + "</td>";
                listado += "<td>" + registroMantenimiento.idVehiculo + "</td></tr>";
            }
            listado += "</tbody></table>";
        }

        return listado;
    }
}
