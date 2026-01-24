// import React, { createContext, useContext, useState } from "react";

// // Create Context
// const CartContext = createContext();

// // Hook for consuming cart
// export const useCart = () => useContext(CartContext);

// // Provider component
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       // Check if product already exists, then increment quantity
//       const existing = prev.find((item) => item.id === product.id);
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const updateQuantity = (productId, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Hook for consuming cart
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart (increment if exists)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update quantity of a product
  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total price of cart
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
