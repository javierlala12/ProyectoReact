import { Chart, ChartTitle, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartCategoryAxisTitle } from '@progress/kendo-react-charts';
import 'hammerjs';
import { useEffect, useState } from 'react';
import { peticionGET } from '../utils/ajax';

function Grafica() {
    const [categorias, setCategorias] = useState([]);
    const [serieDatos, setSerieDatos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let parametros = new FormData();
            let respuesta = await peticionGET("/registroMantenimientos",parametros);

            if (respuesta.ok) {
                const datos = respuesta.datos;
                console.log(datos);
                let categoriasAux = datos.map(dato => dato.nombre); // Nombre del registro de mantenimiento
                let serieDatosAux = datos.map(dato => dato.precio); // Asumiendo que queremos graficar el precio

                setCategorias(categoriasAux);
                setSerieDatos(serieDatosAux);
            } else {
                alert("Hubo un error al obtener los datos de registroMantenimientos");
            }
        }
        fetchData();
    }, []);

    return (
        <Chart>
            <ChartTitle text="Precios de Registros de Mantenimiento" />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categorias}>
                    <ChartCategoryAxisTitle text="Registros de Mantenimiento" />
                </ChartCategoryAxisItem>
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem type="column" data={serieDatos} />
            </ChartSeries>
        </Chart>
    );
}

export default Grafica;
