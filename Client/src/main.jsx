import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist';
import App from './App.jsx';
import Home from './pages/home.jsx';
import Error from './pages/error.jsx';
import About from './pages/about.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);