import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast'; 
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        {/*AQUÍ VA EL COMPONENTE TOASTER */}
        <Toaster 
           position="top-center" 
           reverseOrder={false} 
        />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);