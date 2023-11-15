import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './Styles/main.css'

import App from './App';
import Login from './Login';
import Register from './Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }, {
    path: '/login',
    element: <Login />
  }, {
    path: '/register',
    element: <Register />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);