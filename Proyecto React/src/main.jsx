import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AltaRegistroMantenimiento from './components/AltaRegistroMantenimiento';
import ListadoRegistroMantenimiento from './components/ListadoRegistroMantenimiento';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Grafica from './components/Grafica';
import FichaRegistroMantenimiento from './components/FichaRegistroMantenimiento';
import BorrarRegistroMantenimiento from './components/BorrarRegistroMantenimiento';
import EditarRegistroMantenimiento from './components/EditarRegistroMantenimiento';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "altaregistroMantenimiento",
        element: <AltaRegistroMantenimiento />,
      },
      {
        path: "listadoregistroMantenimiento",
        element: <ListadoRegistroMantenimiento />,
      },
      {
        path: "graficaregistroMantenimiento",
        element: <Grafica />,
      },
      {
        path: "ficharegistroMantenimiento/:idregistroMantenimiento",
        element: <FichaRegistroMantenimiento />,
      },{
      path:"borrarregistroMantenimiento/:idregistroMantenimiento",
      element: <BorrarRegistroMantenimiento />},
      {
        path:"editarregistroMantenimiento/:idregistroMantenimiento",
        element: <EditarRegistroMantenimiento />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
