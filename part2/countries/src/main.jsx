import ReactDOM from 'react-dom/client'
import './global.css'
import countriesJSON from '../data.json'

const alfabeticalCountries = countriesJSON.sort((a, b) => a.name.common.localeCompare(b.name.common));

import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Importamos las rutas de la carpeta pages
const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
//Creamos las rutas
const routes = Object.keys(pages).map(
    path => {
        let objPath = '/' + path.match(/\.\/pages\/(.*)\.jsx$/)?.[1].toLowerCase();
        let objComponent = pages[path].default
        if (objPath == '/home') {
            objPath = '/'
        }
        if (objPath == '/country') {
            objPath = '/country/:id'
        }
        return {
            path: objPath,
            Element: objComponent,
            loader: pages[path]?.loader,
            action: pages[path]?.action,
            ErrorBoundary: pages[path]?.ErrorBoundary,
            countries: objPath === '/' ? alfabeticalCountries : null,
        };
    }
);
const router = createBrowserRouter(
    routes.map(({ Element, countries, ...path }) => (
        {
            ...path,
            element: <Element countries={countries} />,
        }
    ))
);
ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)