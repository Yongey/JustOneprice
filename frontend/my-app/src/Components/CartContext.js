import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart items from localStorage or an empty array if not present
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, size, images) => {
    const existingItem = cartItems.find(
      (item) =>
        item.product.product_id === product.product_id && item.size === size
    );

    if (existingItem) {
      // If item already exists in cart, update its quantity
      const updatedCartItems = cartItems.map((item) =>
        item.product.product_id === product.product_id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // If item is not in cart, add it with given quantity and images
      setCartItems([...cartItems, { product, quantity, size, images }]);
    }
  };

  const removeFromCart = (productId, size) => {
    const updatedCartItems = cartItems.filter(
      (item) => !(item.product.product_id === productId && item.size === size)
    );
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemQuantity = (productId, size) => {
    const item = cartItems.find(
      (item) => item.product.product_id === productId && item.size === size
    );
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemQuantity,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
