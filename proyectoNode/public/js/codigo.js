"use strict";

// MAIN PROGRAM
var oEmpresa = new Empresa();

registrarEventos();

// Registro de eventos
function registrarEventos() {
    // Opciones de menú
    document
        .querySelector("#mnuAltaVehiculo")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarRegistroMantenimiento")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoVehiculo")
        .addEventListener("click", mostrarListadoVehiculo);
    document.querySelector("#mnuListadoRegistroMantenimiento").addEventListener("click",mostrarListadoRegistroMantenimientos);
    document.querySelector("#mnuListadoPorVehiculo").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuAltaRegistroMantenimiento").addEventListener("click", mostrarFormulario);

    // Botones
    frmAltaVehiculo.btnAceptarAltaVehiculo.addEventListener("click", procesarAltaVehiculo);
    frmBuscarRegistroMantenimiento.btnBuscarRegistroMantenimiento.addEventListener("click", procesarBuscarRegistroMantenimiento);
    frmListadoVehiculo.btnAceptarListadoPorVehiculo.addEventListener("click", procesarListadoPorVehiculo);
    frmModificarRegistroMantenimiento.btnAceptarModRegistroMantenimiento.addEventListener("click", procesarModificarRegistroMantenimiento);
    frmAltaRegistroMantenimiento.btnAceptarAltaRegistroMantenimiento.addEventListener("click", procesarAltaRegistroMantenimiento);
}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaVehiculo":
            frmAltaVehiculo.style.display = "block";
            break;
        case "mnuBuscarRegistroMantenimiento":
            frmBuscarRegistroMantenimiento.style.display = "block";
            break;
        case "mnuListadoPorVehiculo":
            frmListadoVehiculo.style.display = "block";
            actualizarDesplegableVehiculos(undefined);
            break;
        case "mnuAltaRegistroMantenimiento":
            frmAltaRegistroMantenimiento.style.display = "block";
            actualizarDesplegableVehiculos(undefined);
            break;
    }
}

function ocultarFormularios() {
    frmAltaVehiculo.style.display = "none";
    frmBuscarRegistroMantenimiento.style.display = "none";
    frmListadoVehiculo.style.display = "none";
    frmModificarRegistroMantenimiento.style.display = "none";
    frmAltaRegistroMantenimiento.style.display = "none";
    // Borrado del contenido de capas con resultados
    document.querySelector("#resultadoBusqueda").innerHTML = "";
    document.querySelector("#listados").innerHTML = "";
}

async function actualizarDesplegableVehiculos(idVehiculoSeleccionado) {

    let respuesta = await oEmpresa.getVehiculos();
    let options = "";

    for (let vehiculo of respuesta.datos) {
        if (idVehiculoSeleccionado && idVehiculoSeleccionado == vehiculo.idvehiculo) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + vehiculo.idvehiculo + "' >" + vehiculo.vehiculo + "</option>";
        } else {
            options += "<option value='" + vehiculo.idvehiculo + "' >" + vehiculo.vehiculo + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD
    frmListadoVehiculo.lstVehiculo.innerHTML = options;
    // Aprovecho y actualizo todos los desplegables se vea o no el formulario
    frmModificarRegistroMantenimiento.lstModVehiculo.innerHTML = options;
    frmAltaRegistroMantenimiento.lstAltaVehiculo.innerHTML = options;
}

// Procesos de botones
async function procesarBuscarRegistroMantenimiento() {
    if (validarBuscarRegistroMantenimiento()) {
        let idRegistroMantenimiento = parseInt(frmBuscarRegistroMantenimiento.txtIdRegistroMantenimiento.value.trim());

        let respuesta = await oEmpresa.buscarRegistroMantenimiento(idRegistroMantenimiento);

        if (respuesta.ok) { // Si NO hay error
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

            // Escribimos resultado
            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr><th>IDREGISTRO</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PRECIO</th><th>TIPO</th><th>ACCION</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + respuesta.datos.idregistroMantenimiento + "</td>"
            tablaSalida += "<td>" + respuesta.datos.nombre + "</td>"
            tablaSalida += "<td>" + respuesta.datos.descripcion + "</td>"
            tablaSalida += "<td>" + respuesta.datos.precio + "</td>"
            tablaSalida += "<td>" + respuesta.datos.vehiculo + "</td>"
            tablaSalida += "<td><input type='button' class='btn btn-danger' value='Borrar' id='btnBorrarRegistroMantenimiento' data-idregistroMantenimiento='" + respuesta.datos.idregistroMantenimiento + "'></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarRegistroMantenimiento").addEventListener("click", borrarRegistroMantenimiento);
        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}

async function procesarListadoPorVehiculo() {
    // Recuperar idVehiculo seleccionado
    let idVehiculo = frmListadoVehiculo.lstVehiculo.value;

    let respuesta = await oEmpresa.listadoPorVehiculo(idVehiculo);

    let tabla = "<table class='table table-striped' id='listadoPorVehiculo'>";
    tabla += "<thead><tr><th>IDREGISTRO</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PRECIO</th><th>ACCION</th></tr></thead><tbody>";

    for (let registroMantenimiento of respuesta.datos) {
        tabla += "<tr><td>" + registroMantenimiento.idregistroMantenimiento + "</td>";
        tabla += "<td>" + registroMantenimiento.nombre + "</td>";
        tabla += "<td>" + registroMantenimiento.descripcion + "</td>";
        tabla += "<td>" + registroMantenimiento.precio + "</td>";

        tabla += "<td><button class='btn btn-primary' data-registroMantenimiento='" + JSON.stringify(registroMantenimiento) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = tabla;
    // Agregar manejador de evento para toda la tabla
    document.querySelector("#listadoPorVehiculo").addEventListener('click', procesarBotonEditarRegistroMantenimiento);

}

function procesarBotonEditarRegistroMantenimiento(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de registroMantenimientos
        frmModificarRegistroMantenimiento.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del registroMantenimiento
        let registroMantenimiento = JSON.parse(boton.dataset.registroMantenimiento);

        frmModificarRegistroMantenimiento.txtModIdRegistroMantenimiento.value = registroMantenimiento.idregistroMantenimiento;
        frmModificarRegistroMantenimiento.txtModNombre.value = registroMantenimiento.nombre;
        frmModificarRegistroMantenimiento.txtModDescripcion.value = registroMantenimiento.descripcion;
        frmModificarRegistroMantenimiento.txtModPrecio.value = registroMantenimiento.precio;
        actualizarDesplegableVehiculos(registroMantenimiento.idvehiculo);


    }
}

async function procesarModificarRegistroMantenimiento() {
    // Recuperar datos del formulario frmModificarRegistroMantenimiento
    let idRegistroMantenimiento = frmModificarRegistroMantenimiento.txtModIdRegistroMantenimiento.value.trim();
    let nombre = frmModificarRegistroMantenimiento.txtModNombre.value.trim();
    let descripcion = frmModificarRegistroMantenimiento.txtModDescripcion.value.trim();
    let precio = parseFloat(frmModificarRegistroMantenimiento.txtModPrecio.value.trim());
    let idVehiculo = frmModificarRegistroMantenimiento.lstModVehiculo.value;

    // Validar datos del formulario
    if (validarModRegistroMantenimiento()) {
        let respuesta = await oEmpresa.modificarRegistroMantenimiento(new RegistroMantenimiento(idRegistroMantenimiento, nombre, descripcion, precio, idVehiculo));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarRegistroMantenimiento.reset();
            // Ocultar el formulario
            frmModificarRegistroMantenimiento.style.display = "none";
        }

    }
}

function validarModRegistroMantenimiento() {
    // Recuperar datos del formulario frmModificarRegistroMantenimiento
    let idRegistroMantenimiento = frmModificarRegistroMantenimiento.txtModIdRegistroMantenimiento.value.trim();
    let nombre = frmModificarRegistroMantenimiento.txtModNombre.value.trim();
    let descripcion = frmModificarRegistroMantenimiento.txtModDescripcion.value.trim();
    let precio = parseFloat(frmModificarRegistroMantenimiento.txtModPrecio.value.trim());
    let idVehiculo = parseInt(frmModificarRegistroMantenimiento.lstModVehiculo.value);

    let valido = true;
    let errores = "";

    if (isNaN(idRegistroMantenimiento)) {
        valido = false;
        errores += "El identificador de registroMantenimiento debe ser numérico";
    }

    if (isNaN(precio)) {
        valido = false;
        errores += "El precio del registroMantenimiento debe ser numérico";
    }

    if (nombre.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}


async function borrarRegistroMantenimiento(oEvento) {
    let boton = oEvento.target;
    let idRegistroMantenimiento = parseInt(boton.dataset.idregistroMantenimiento);
    console.log("Borrar registroMantenimiento con id: " + idRegistroMantenimiento);

    let respuesta = await oEmpresa.borrarRegistroMantenimiento(idRegistroMantenimiento);

    alert(respuesta.mensaje);

    if (respuesta.ok) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    }

}

function validarBuscarRegistroMantenimiento() {
    let idRegistroMantenimiento = parseInt(frmBuscarRegistroMantenimiento.txtIdRegistroMantenimiento.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(idRegistroMantenimiento)) {
        valido = false;
        errores += "El identificador de registroMantenimiento debe ser numérico";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}


async function procesarAltaVehiculo() {
    if (validarAltaVehiculo()) {
        let vehiculo = frmAltaVehiculo.txtVehiculo.value.trim();
        let descripcion = frmAltaVehiculo.txtDescripcion.value.trim();

        let respuesta = await oEmpresa.altaVehiculo(new Vehiculo(null, vehiculo, descripcion));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaVehiculo.reset();
            // Ocultar el formulario
            frmAltaVehiculo.style.display = "none";
        }
    }
}

function validarAltaVehiculo() {
    let vehiculo = frmAltaVehiculo.txtVehiculo.value.trim();
    let descripcion = frmAltaVehiculo.txtDescripcion.value.trim();
    let valido = true;
    let errores = "";

    if (vehiculo.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

// Mostrar listado de vehiculos de registroMantenimientos
function mostrarListadoVehiculo() {
    open("listado_vehiculos.html ");
}

// Mostrar listado de registroMantenimientos
function mostrarListadoRegistroMantenimientos() {
    open("listado_registroMantenimientos.html ");
}


async function procesarAltaRegistroMantenimiento() {
    // Recuperar datos del formulario frmAltaRegistroMantenimiento
    let nombre = frmAltaRegistroMantenimiento.txtAltaNombre.value.trim();
    let descripcion = frmAltaRegistroMantenimiento.txtAltaDescripcion.value.trim();
    let precio = parseFloat(frmAltaRegistroMantenimiento.txtAltaPrecio.value.trim());
    let idVehiculo = parseInt(frmAltaRegistroMantenimiento.lstAltaVehiculo.value);

    // Validar datos del formulario
    if (validarAltaRegistroMantenimiento()) {
        let respuesta = await oEmpresa.altaRegistroMantenimiento(new RegistroMantenimiento(null, nombre, descripcion, precio, idVehiculo)); 
        alert(respuesta.mensaje);

        if (respuesta.ok) { // Si NO hay error
            //Resetear formulario
            frmAltaRegistroMantenimiento.reset();
            // Ocultar el formulario
            frmAltaRegistroMantenimiento.style.display = "none";
        }

    }
}

function validarAltaRegistroMantenimiento() {
    // Recuperar datos del formulario frmModificarRegistroMantenimiento
    let nombre = frmAltaRegistroMantenimiento.txtAltaNombre.value.trim();
    let descripcion = frmAltaRegistroMantenimiento.txtAltaDescripcion.value.trim();
    let precio = parseFloat(frmAltaRegistroMantenimiento.txtAltaPrecio.value.trim());
    let idVehiculo = frmAltaRegistroMantenimiento.lstAltaVehiculo.value;

    let valido = true;
    let errores = "";

    if (isNaN(precio)) {
        valido = false;
        errores += "El precio del registroMantenimiento debe ser numérico";
    }

    if (nombre.length == 0 || descripcion.length == 0) {
        valido = false;
        errores += "El nombre y la descripción no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}
