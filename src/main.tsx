import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EssayGenerator from './EssayGenerator';
import FourOFour from './FourOFour';

// 1. Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <FourOFour />
  },
  {
    path: '/essay-generator',
    element: <EssayGenerator />,
  },
  {
    path: '/flashcards',
    element: <App />,
  },
]);

// 2. Render the RouterProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
