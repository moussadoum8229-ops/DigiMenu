import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('digimenu_cart');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error("Erreur de lecture du panier depuis localStorage", error);
      return {};
    }
  });

  const [tableNumber, setTableNumber] = useState(() => {
    return localStorage.getItem('digimenu_table') || '';
  });

  useEffect(() => {
    localStorage.setItem('digimenu_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('digimenu_table', tableNumber);
  }, [tableNumber]);

  const addToCart = (item, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart[item.itemId];
      const currentQty = existing ? existing.quantity : 0;
      const newQty = currentQty + qty;
      return {
        ...prevCart,
        [item.itemId]: {
          ...item,
          quantity: newQty
        }
      };
    });
  };

  const removeFromCart = (itemId, qty = 1, forceRemove = false) => {
    setCart((prevCart) => {
      const existing = prevCart[itemId];
      if (!existing) return prevCart;

      const newQty = existing.quantity - qty;
      if (newQty <= 0 || forceRemove) {
        const newCart = { ...prevCart };
        delete newCart[itemId];
        return newCart;
      }

      return {
        ...prevCart,
        [itemId]: {
          ...existing,
          quantity: newQty
        }
      };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartCount, getCartTotal, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé au sein de CartProvider');
  }
  return context;
}
