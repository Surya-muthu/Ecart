// // // AppContext.js
// // import React, { createContext, useState, useEffect } from "react";

// // export const API_BASE = "http://127.0.0.1:8000/api";
// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [page, setPage] = useState("login"); // login | register | me
// //   const [message, setMessage] = useState("");
// //   const [user, setUser] = useState(null);
// //   const [activeTab, setActiveTab] = useState("home"); // home | products | profile | cart
// //   const [cart, setCart] = useState([]);
// //   const [search, setSearch] = useState("");

// //   const [registerData, setRegisterData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [loginData, setLoginData] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   // ================= INPUT HANDLERS =================
// //   const handleRegisterChange = (e) =>
// //     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
// //   const handleLoginChange = (e) =>
// //     setLoginData({ ...loginData, [e.target.name]: e.target.value });

// //   // ================= REGISTER =================
// //   const register = async () => {
// //     setMessage("");
// //     if (registerData.password !== registerData.confirmPassword) {
// //       setMessage("❌ Passwords do not match");
// //       return;
// //     }
// //     const res = await fetch(`${API_BASE}/register/`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         username: registerData.username,
// //         email: registerData.email,
// //         password: registerData.password,
// //       }),
// //     });
// //     const data = await res.json();
// //     if (res.ok) {
// //       setMessage("✅ Registered successfully. Please login.");
// //       setPage("login");
// //       setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
// //     } else {
// //       setMessage(JSON.stringify(data));
// //     }
// //   };

// //   // ================= LOGIN =================
// //   const login = async () => {
// //     setMessage("");
// //     const res = await fetch(`${API_BASE}/login/`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(loginData),
// //     });
// //     const data = await res.json();
// //     if (res.ok) {
// //       localStorage.setItem("access", data.access);
// //       localStorage.setItem("refresh", data.refresh);
// //       fetchMe(data.access);
// //     } else {
// //       setMessage(JSON.stringify(data));
// //     }
// //   };

// //   // ================= PROTECTED /ME =================
// //   const fetchMe = async (token) => {
// //     const res = await fetch(`${API_BASE}/me/`, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
// //     const data = await res.json();
// //     if (res.ok) {
// //       setUser(data);
// //       setPage("me");
// //       setMessage("");
// //     } else {
// //       setMessage("❌ Token invalid or expired");
// //     }
// //   };

// //   // ================= LOGOUT =================
// //   const logout = () => {
// //     localStorage.clear();
// //     setUser(null);
// //     setCart([]);
// //     setPage("login");
// //     setMessage("Logged out");
// //   };

// //   // ================= CART LOGIC =================
// //   const addToCart = (product) => {
// //     setCart((prev) => {
// //       const existing = prev.find((p) => p.id === product.id);
// //       if (existing) {
// //         return prev.map((p) =>
// //           p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
// //         );
// //       }
// //       return [...prev, { ...product, quantity: 1 }];
// //     });
// //   };

// //   const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
// //   const updateQuantity = (id, qty) =>
// //     setCart((prev) =>
// //       prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
// //     );
// //   const clearCart = () => setCart([]);
// //   const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

// //   // ================= AUTO LOGIN =================
// //   useEffect(() => {
// //     const token = localStorage.getItem("access");
// //     if (token) fetchMe(token);
// //   }, []);

// //   return (
// //     <AppContext.Provider
// //       value={{
// //         page,
// //         setPage,
// //         message,
// //         setMessage,
// //         user,
// //         setUser,
// //         activeTab,
// //         setActiveTab,
// //         registerData,
// //         handleRegisterChange,
// //         register,
// //         loginData,
// //         handleLoginChange,
// //         login,
// //         logout,
// //         cart,
// //         addToCart,
// //         removeFromCart,
// //         updateQuantity,
// //         clearCart,
// //         cartTotal,
// //         search,
// //         setSearch,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };


// import React, { createContext, useState, useContext, useEffect } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [page, setPage] = useState("login");
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("home");
//   const [cart, setCart] = useState([]);
//   const [search, setSearch] = useState("");

//   const [registerData, setRegisterData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   // INPUT HANDLERS
//   const handleRegisterChange = (e) =>
//     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//   const handleLoginChange = (e) =>
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });

//   // CART LOGIC
//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.id === product.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };
//   const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
//   const updateQuantity = (id, qty) =>
//     setCart((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
//     );
//   const clearCart = () => setCart([]);
//   const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
//   const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

//   return (
//     <AppContext.Provider
//       value={{
//         page,
//         setPage,
//         message,
//         setMessage,
//         user,
//         setUser,
//         activeTab,
//         setActiveTab,
//         registerData,
//         handleRegisterChange,
//         loginData,
//         handleLoginChange,
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         cartTotal,
//         search,
//         setSearch,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
// AppContext.js
import React, { createContext, useState, useEffect } from "react";

export const API_BASE = "http://127.0.0.1:8000/api";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState("login"); // login | register | me
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home"); // home | products | profile | cart
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ================= INPUT HANDLERS =================
  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  // ================= REGISTER =================
  const register = async () => {
    setMessage("");
    if (registerData.password !== registerData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully. Please login.");
        setPage("login");
        setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        setMessage(JSON.stringify(data));
      }
    } catch (err) {
      setMessage("❌ Registration failed. Check your network.");
    }
  };

  // ================= LOGIN =================
  const login = async () => {
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        fetchMe(data.access);
      } else {
        setMessage(JSON.stringify(data));
      }
    } catch (err) {
      setMessage("❌ Login failed. Check your network.");
    }
  };

  // ================= PROTECTED /ME =================
  const fetchMe = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setPage("me");
        setMessage("");
      } else {
        setMessage("❌ Token invalid or expired");
      }
    } catch (err) {
      setMessage("❌ Failed to fetch user profile");
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCart([]);
    setPage("login");
    setMessage("Logged out");
  };

  // ================= CART LOGIC =================
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const updateQuantity = (id, qty) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
  const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  // ================= AUTO LOGIN =================
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) fetchMe(token);
  }, []);

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        message,
        setMessage,
        user,
        setUser,
        activeTab,
        setActiveTab,
        registerData,
        handleRegisterChange,
        register,
        loginData,
        handleLoginChange,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
