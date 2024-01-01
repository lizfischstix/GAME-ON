import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Dash from './pages/Dash.jsx';
import Error from './pages/Error.jsx';
import About from './pages/About.jsx';
import GameSearch from './pages/GameSearch.jsx';

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
        path: "/dash",
        element: <Dash />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/search",
        element: <GameSearch />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
