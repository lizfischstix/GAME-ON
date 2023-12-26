import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css';
import App from './App';
import Home from './pages/Home.jsx';
import Dash from './pages/Dash.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import Error from './pages/Error.jsx';
import About from './pages/About.jsx';

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dash",
        element: <Dash />,
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
)
