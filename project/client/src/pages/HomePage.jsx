import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGallery from '../components/ProductGallery';
import { useCart } from '../context/CartContext'; 

function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart, cart } = useCart(); 

  // Obtener catálogo de productos
  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      
      <h2 style={{ marginTop: '20px', marginBottom: '20px', color: 'var(--secondary)' }}>
        Nuestras Colecciones
      </h2>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {products.map(p => {
          // Calcular stock real (Stock total - Cantidad en carrito)
          const productInCart = cart.find(item => item.id === p.id);
          const quantityInCart = productInCart ? productInCart.quantity : 0;
          const availableStock = p.stock - quantityInCart;
          const isOutOfStock = availableStock <= 0;

          // Configuración de galería de imágenes
          const imagesToShow = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image_url];

          return (
            <div key={p.id} className="card">
              
              <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                 <ProductGallery images={imagesToShow} />
              </div>

              <h3>{p.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{p.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>{p.price} €</span>
                  
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    color: isOutOfStock ? 'var(--danger)' : (availableStock < 3 ? 'orange' : 'var(--accent)') 
                  }}>
                    {isOutOfStock ? "¡Agotado!" : `Stock: ${availableStock}`}
                  </span>
              </div>

              <button 
                onClick={() => addToCart(p)} 
                disabled={isOutOfStock} 
                style={{ 
                  width: '100%', 
                  marginTop: '15px', 
                  padding: '10px', 
                  background: isOutOfStock ? '#ccc' : 'var(--primary)', 
                  color: 'white', 
                }}
              >
                {isOutOfStock ? 'Sin Stock' : 'Añadir al Carrito 🛒'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;