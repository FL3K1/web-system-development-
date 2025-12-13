import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + 1 > product.stock) {
      toast.error(`❌ Solo quedan ${product.stock} unidades.`);
      return;
    }

    toast.success("Producto añadido al carrito 🛒");

    setCart(prevCart => {
      const isItemInCart = prevCart.find(item => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // NUEVA FUNCIÓN: RESTAR CANTIDAD 
  const decreaseQuantity = (id) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      
      // Si solo queda 1, lo borramos del todo
      if (existingItem?.quantity === 1) {
        return prevCart.filter(item => item.id !== id);
      }

      // Si hay más, restamos 1
      return prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // Función para borrar de golpe 
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast("Producto eliminado", { icon: '🗑️' });
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    // AÑADIMOS decreaseQuantity 
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};