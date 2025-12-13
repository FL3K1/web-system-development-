import React from 'react';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, removeFromCart, decreaseQuantity, addToCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}><h2>Tu carrito está vacío 😢</h2></div>;
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>🛒 Tu Carrito de Compras</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cart.map(item => (
          <div key={item.id} className="card" style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
          }}>
            
            {/* Imagen y descripción */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {item.gallery && <img src={item.gallery[0]} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />}
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>Precio unitario: {item.price} €</p>
              </div>
            </div>

            {/* Controles de cantidad */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => decreaseQuantity(item.id)}
                style={{ background: '#ddd', color: 'black', width: '30px', height: '30px', padding: 0, borderRadius: '50%' }}
              >
                -
              </button>
              
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                {item.quantity}
              </span>
              
              <button 
                onClick={() => addToCart(item)}
                style={{ background: '#ddd', color: 'black', width: '30px', height: '30px', padding: 0, borderRadius: '50%' }}
              >
                +
              </button>
            </div>

            {/* Precio total y botón eliminar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {(item.price * item.quantity).toFixed(2)} €
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)} 
                style={{ background: '#dc3545', padding: '8px', borderRadius: '5px' }}
                title="Eliminar todo"
              >
                🗑️
              </button>
            </div>

          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Total a pagar: {totalPrice.toFixed(2)} €
      </div>
      
      <button 
        onClick={() => { alert("¡Gracias por tu compra!"); clearCart(); }}
        style={{ marginTop: '20px', width: '100%', padding: '15px', background: '#28a745', fontSize: '1.2rem', borderRadius: '5px', border: 'none', color: 'white', cursor: 'pointer' }}
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default CartPage;