import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. Lista de productos (Mínimo 3 según el enunciado)
  const products = [
    { name: "Laptop", price: 799.98 },
    { name: "Smartphone", price: 599.49 },
    { name: "Headphones", price: 149.99 },
  ];

  // 2. Estado del carrito
  const [cart, setCart] = useState([]);

  // Añadir producto
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Eliminar producto (usando el índice para no borrar duplicados por error)
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // Calcular total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <h1>Shop Juanjo</h1>
      
      {/* SECCIÓN DE PRODUCTOS */}
      <div className="products-list">
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              <span>{product.name} - ${product.price}</span>
              {/* REQUISITO: data-testid="add-{index}" */}
              <button 
                data-testid={`add-${index}`} 
                onClick={() => addToCart(product)}
                style={{ marginLeft: '10px' }}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* SECCIÓN DEL CARRITO */}
      <div className="cart-section">
        <h2>Cart</h2>
        {cart.length === 0 && <p>The cart is empty</p>}
        
        <ul>
          {cart.map((item, index) => (
            // REQUISITO: data-testid="cart-item-{index}"
            <li key={index} data-testid={`cart-item-${index}`}>
              {item.name} - ${item.price}
              {/* REQUISITO: data-testid="remove-{index}" */}
              <button 
                data-testid={`remove-${index}`} 
                onClick={() => removeFromCart(index)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* REQUISITO: Total con data-testid="cart-total" */}
        <h3>Total: $<span data-testid="cart-total">{total.toFixed(2)}</span></h3> {/*Fixed para que haya bugs con los decimales al añadir  muchos productos" */}
      </div>
    </div>
  );
}

export default App;