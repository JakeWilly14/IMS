import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

// Page Routes
import App from './App.jsx';
import ErrorPage from '../src/pages/ErrorPage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import AuthService from './utils/auth';

// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <ErrorPage />,
    children: [
      {
        index: true,
        element: AuthService.loggedIn() ? <Home /> : <Login />, // Render Home if logged in, otherwise render Login
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />,
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
