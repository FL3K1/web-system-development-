import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Calcular total de productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cerrar sesión y redirigir
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      
      {/* Sección del Logo */}
      <div className="nav-left">
        <Link to="/" className="navbar-brand">Juanjo's Shop</Link>
      </div>
      
      {/* Enlaces de navegación */}
      <div className="nav-center">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/products" className="nav-link">Tienda</Link>
      </div>

      {/* Sección de usuario y carrito */}
      <div className="nav-right">
        <Link to="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          🛒 Carrito
          {totalItems > 0 && (
            <span style={{ 
              background: 'var(--danger)', color: 'white', 
              borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' 
            }}>
              {totalItems}
            </span>
          )}
        </Link>

        {token ? (
          // Vista para usuario logueado
          <button 
            onClick={handleLogout} 
            style={{ background: 'var(--secondary)', color: 'white', padding: '8px 20px' }}
          >
            SALIR
          </button>
        ) : (
          // Vista para invitados (Entrar / Registrarse)
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login" className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
              Entrar
            </Link>
            <Link 
              to="/register" 
              style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '8px 20px', 
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
}

export default Navbar;