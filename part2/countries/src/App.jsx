import PropTypes from 'prop-types';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
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
    };
  }
);
const router = createBrowserRouter(
  routes.map(({ Element, ...path }) => ({
    ...path,
    element: <Element />,
  }))
);
const App = ({ countries }) => {
  if (countries === null) {
    return (
      <div>no countries found</div>
    );
  }
  return (
    <RouterProvider router={router} />
  );
};
App.propTypes = { countries: PropTypes.array.isRequired }; export default App;