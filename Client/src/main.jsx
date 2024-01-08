import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import App from './App.jsx'
import Home from './pages/home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <App />,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Home />,
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)