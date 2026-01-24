// // import React, { createContext, useState, useContext, useEffect } from "react";


// // // import ProductDetailPage from "./ProductDetailPage";
// // import ProductSearchPage from "./ProductSearchPage";
// // import FlipMartHome from "./FlipMartHome";
// // import ShoppingCart from "./ShoppingCart";

// // const API_BASE = "http://127.0.0.1:8000/api";

// // // ================== CONTEXT ==================
// // const AppContext = createContext();

// // const AppProvider = ({ children }) => {
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

// // // ================== COMPONENTS ==================
// // const Login = () => {
// //   const { loginData, handleLoginChange, login, setPage } = useContext(AppContext);
// //   return (
// //     <>
// //       <div className="title">Account Login</div>
// //       <input name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
// //       <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
// //       <button onClick={login}>SIGN IN</button>
// //       <div className="switch" onClick={() => setPage("register")}>Sign Up</div>
// //     </>
// //   );
// // };


// // const Register = () => {
// //   const { registerData, handleRegisterChange, register, setPage } = useContext(AppContext);
// //   return (
// //     <>
// //       <div className="title">Sign Up</div>
// //       <input name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} />
// //       <input name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} />
// //       <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} />
// //       <input type="password" name="confirmPassword" placeholder="Confirm password" value={registerData.confirmPassword} onChange={handleRegisterChange} />
// //       <button onClick={register}>Create Account</button>
// //       <div className="switch" onClick={() => setPage("login")}>Already have an account? Sign in</div>
// //     </>
// //   );
// // };

// // const HomePage = () => (
// //   <div>
// //     <FlipMartHome/>
    
// //   </div>
// // );

// // // const ProductPage = () => {
// // //   const { addToCart, search } = useContext(AppContext);
// // //   const [products, setProducts] = useState([]);

// // //   useEffect(() => {
// // //     const demoProducts = [
// // //       { id: 1, name: "iPhone 15", price: 999, image: "https://via.placeholder.com/150" },
// // //       { id: 2, name: "MacBook Pro", price: 1999, image: "https://via.placeholder.com/150" },
// // //       { id: 3, name: "Sony Headphones", price: 199, image: "https://via.placeholder.com/150" },
// // //       { id: 4, name: "Samsung Galaxy S24", price: 899, image: "https://via.placeholder.com/150" },
// // //       { id: 5, name: "Nike Sneakers", price: 149, image: "https://via.placeholder.com/150" },
// // //     ];
// // //     setProducts(demoProducts);
// // //   }, []);

// // //   const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

// // //   return (
// // //     <div>
// // //       <h2>Products</h2>
// // //       {filtered.length === 0 ? <p>No products found.</p> : (
// // //         <div className="product-grid">
// // //           {filtered.map(p => (
// // //             <div key={p.id} className="product-card">
// // //               <img src={p.image} alt={p.name} />
// // //               <h3>{p.name}</h3>
// // //               <p>${p.price}</p>
// // //               <button onClick={() => addToCart(p)}>Add to Cart</button>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // const CartPage = () => {
// //   const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(AppContext);

// //   return (
// //     <div>
// //       <h2>Cart</h2>
// //       {cart.length === 0 ? (
// //         <p>Your cart is empty.</p>
// //       ) : (
// //         <div>
// //           {cart.map(item => (
// //             <div key={item.id} className="cart-item">
// //               <img src={item.image} alt={item.name} />
// //               <div className="cart-info">
// //                 <h4>{item.name}</h4>
// //                 <p>${item.price}</p>
// //                 <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
// //                   <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item.id, Number(e.target.value))} />
// //                   <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //           <h3>Total: ${cartTotal}</h3>
// //           <div style={{ marginTop: "10px" }}>
// //             <button onClick={clearCart}>Clear Cart</button>
// //             <button style={{ marginLeft: "10px" }}>Checkout</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const ProfilePage = () => {
// //   const { user } = useContext(AppContext);

// //   const avatarStyle = {
// //     width: "100px",
// //     height: "100px",
// //     borderRadius: "50%",
// //     backgroundColor: "#135bec",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     color: "#fff",
// //     fontSize: "36px",
// //     fontWeight: "bold",
// //     marginBottom: "20px",
// //     overflow: "hidden",
// //   };

// //   const containerStyle = {
// //     maxWidth: "400px",
// //     margin: "50px auto",
// //     background: "#fff",
// //     borderRadius: "12px",
// //     padding: "30px",
// //     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
// //     textAlign: "center",
// //     fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
// //   };

// //   const infoStyle = {
// //     textAlign: "left",
// //     marginTop: "20px",
// //     lineHeight: 1.6,
// //   };

// //   const usernameAvatar = user?.username ? user.username.charAt(0).toUpperCase() : "?";

// //   return (
// //     <div style={containerStyle}>
// //       {user ? (
// //         <>
// //           <div style={avatarStyle}>
// //             {user.profileImage ? (
// //               <img
// //                 src={user.profileImage}
// //                 alt={user.username}
// //                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //               />
// //             ) : (
// //               usernameAvatar
// //             )}
// //           </div>
// //           <h2 style={{ marginBottom: "10px" }}>{user.username}</h2>
// //           <div style={infoStyle}>
// //             <p>
// //               <strong>Email:</strong> {user.email}
// //             </p>
// //             {user.bio && (
// //               <p>
// //                 <strong>Bio:</strong> {user.bio}
// //               </p>
// //             )}
// //             {user.joinDate && (
// //               <p>
// //                 <strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}
// //               </p>
// //             )}
// //           </div>
// //         </>
// //       ) : (
// //         <p>Loading profile...</p>
// //       )}
// //     </div>
// //   );
// // };
// // // const ProfilePage = () => {
// // //   const { user } = useContext(AppContext);
// // //   return (
// // //     <div>
// // //       <h2>Profile</h2>
// // //       {user ? (
// // //         <div>
// // //           <p><strong>Username:</strong> {user.username}</p>
// // //           <p><strong>Email:</strong> {user.email}</p>
// // //         </div>
// // //       ) : <p>Loading profile...</p>}
// // //     </div>
// // //   );
// // // };

// // // ================== MAIN CONTENT ==================
// // const Content = () => {
// //   const { page, message, user, activeTab, setActiveTab, logout, cart, search, setSearch } = useContext(AppContext);

// //   return (
// //     <div className="page">
// //       {page !== "me" && (
// //         <div className="card">
// //           {message && <div className="message">{message}</div>}
// //           {page === "register" && <Register />}
// //           {page === "login" && <Login />}
// //         </div>
// //       )}

// //       {page === "me" && user && (
// //         <div className="full-page">
// //           <div className="tabs">
// //             <span className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Home</span>
// //             <span className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>Products</span>
// //             <span className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</span>
// //             <span className={activeTab === "cart" ? "active" : ""} onClick={() => setActiveTab("cart")}>
// //               🛒 {cart.length > 0 && `(${cart.length})`}
// //             </span>
// //             <input
// //               className="search-bar"
// //               placeholder="Search products..."
// //               value={search}
// //               onChange={e => setSearch(e.target.value)}
// //             />
// //             <span className="logout" onClick={logout}>Logout</span>
// //           </div>
// //           <div className="content">
// //             {activeTab === "home" && <HomePage />}
// //             {activeTab === "products" && <ProductSearchPage />}
// //             {activeTab === "profile" && <><ProfilePage /></>}
// //             {activeTab === "cart" && <ShoppingCart/>}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ================== MAIN APP ==================
// // export default function App() {
// //   return (
// //     <AppProvider>
// //       <style>{`
// //         * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
// //         body, html, #root { margin: 0; height: 100%; }
// //         .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f3f4f6; }
// //         .card { width: 420px; background: #0d256e; padding: 40px; border-radius: 16px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; }
// //         .full-page { width: 100%; height: 100vh; display: flex; flex-direction: column; }
// //         .tabs { display: flex; align-items: center; background: #001f4d; padding: 10px; gap: 10px; }
// //         .tabs span { color: white; font-weight: bold; cursor: pointer; }
// //         .tabs .active { border-bottom: 2px solid white; }
// //         .tabs .logout { margin-left: auto; cursor: pointer; }
// //         .search-bar { padding: 6px 10px; border-radius: 6px; border: none; }
// //         .content { flex: 1; background: #f3f4f6; overflow: auto; padding: 20px; }
// //         .title { text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 24px; }
// //         input { width: 100%; padding: 14px; border-radius: 6px; border: none; margin-bottom: 16px; background: #e8edf5; }
// //         button { width: 100%; padding: 14px; background: black; color: white; font-weight: bold; border: none; cursor: pointer; }
// //         button:hover { opacity: 0.9; }
// //         .switch { text-align: center; margin-top: 16px; cursor: pointer; }
// //         .message { margin-top: 12px; text-align: center; font-size: 14px; }
// //         .product-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 20px; margin-top: 20px; }
// //         .product-card { background: white; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
// //         .product-card img { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; }
// //         .product-card h3 { font-size: 16px; margin: 8px 0; }
// //         .product-card p { font-weight: bold; margin-bottom: 8px; }
// //         .product-card button { padding: 8px 12px; font-weight: bold; background: #0d256e; color: white; border: none; border-radius: 6px; cursor: pointer; }
// //         .product-card button:hover { opacity: 0.9; }
// //         .cart-item { display: flex; align-items: center; margin-bottom: 16px; background: white; padding: 10px; border-radius: 10px; }
// //         .cart-item img { width: 100px; height: 80px; object-fit: cover; border-radius: 6px; margin-right: 10px; }
// //         .cart-info { flex: 1; }
// //         .cart-info input { width: 60px; margin-right: 10px; }
// //         .remove-btn { background: red; padding: 4px 8px; border-radius: 6px; border: none; color: white; cursor: pointer; }
// //         .remove-btn:hover { opacity: 0.8; }
// //       `}</style>
// //       <Content />
// //     </AppProvider>
// //   );
// // }


// import React, { createContext, useState, useContext, useEffect } from "react";

// // import ProductDetailPage from "./ProductDetailPage";
// import ProductSearchPage from "./ProductSearchPage";
// import FlipMartHome from "./FlipMartHome";
// import ShoppingCart from "./ShoppingCart";

// const API_BASE = "http://127.0.0.1:8000/api";

// // ================== CONTEXT ==================
// const AppContext = createContext();

// const AppProvider = ({ children }) => {
//   const [page, setPage] = useState("login"); // login | register | me
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("home"); // home | products | profile | cart
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

//   // ================= INPUT HANDLERS =================
//   const handleRegisterChange = (e) =>
//     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//   const handleLoginChange = (e) =>
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });

//   // ================= REGISTER =================
//   const register = async () => {
//     setMessage("");
//     if (registerData.password !== registerData.confirmPassword) {
//       setMessage("❌ Passwords do not match");
//       return;
//     }
//     const res = await fetch(`${API_BASE}/register/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: registerData.username,
//         email: registerData.email,
//         password: registerData.password,
//       }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setMessage("✅ Registered successfully. Please login.");
//       setPage("login");
//       setRegisterData({ username: "", email: "", password: "", confirmPassword: "" });
//     } else {
//       setMessage(JSON.stringify(data));
//     }
//   };

//   // ================= LOGIN =================
//   const login = async () => {
//     setMessage("");
//     const res = await fetch(`${API_BASE}/login/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginData),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);
//       fetchMe(data.access);
//     } else {
//       setMessage(JSON.stringify(data));
//     }
//   };

//   // ================= PROTECTED /ME =================
//   const fetchMe = async (token) => {
//     const res = await fetch(`${API_BASE}/me/`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setUser(data);
//       setPage("me");
//       setMessage("");
//     } else {
//       setMessage("❌ Token invalid or expired");
//     }
//   };

//   // ================= LOGOUT =================
//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//     setCart([]);
//     setPage("login");
//     setMessage("Logged out");
//   };

//   // ================= CART LOGIC =================
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
//   const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0); // total quantity
//   const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

//   // ================= AUTO LOGIN =================
//   useEffect(() => {
//     const token = localStorage.getItem("access");
//     if (token) fetchMe(token);
//   }, []);

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
//         register,
//         loginData,
//         handleLoginChange,
//         login,
//         logout,
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         cartTotal,
//         totalItems,
//         search,
//         setSearch,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // ================== PAGES / COMPONENTS ==================
// const Login = () => {
//   const { loginData, handleLoginChange, login, setPage } = useContext(AppContext);
//   return (
//     <>
//       <div className="title">Account Login</div>
//       <input name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
//       <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
//       <button onClick={login}>SIGN IN</button>
//       <div className="switch" onClick={() => setPage("register")}>Sign Up</div>
//     </>
//   );
// };

// const Register = () => {
//   const { registerData, handleRegisterChange, register, setPage } = useContext(AppContext);
//   return (
//     <>
//       <div className="title">Sign Up</div>
//       <input name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} />
//       <input name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} />
//       <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} />
//       <input type="password" name="confirmPassword" placeholder="Confirm password" value={registerData.confirmPassword} onChange={handleRegisterChange} />
//       <button onClick={register}>Create Account</button>
//       <div className="switch" onClick={() => setPage("login")}>Already have an account? Sign in</div>
//     </>
//   );
// };

// const HomePage = () => <FlipMartHome />;

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(AppContext);

//   return (
//     <div>
//       <h2>Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map(item => (
//             <div key={item.id} className="cart-item">
//               <img src={item.thumbnail || item.image} alt={item.name} />
//               <div className="cart-info">
//                 <h4>{item.name}</h4>
//                 <p>₹{item.price.toLocaleString()}</p>
//                 <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
//                   <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item.id, Number(e.target.value))} />
//                   <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <h3>Total: ₹{cartTotal.toLocaleString()}</h3>
//           <div style={{ marginTop: "10px" }}>
//             <button onClick={clearCart}>Clear Cart</button>
//             <button style={{ marginLeft: "10px" }}>Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const ProfilePage = () => {
//   const { user } = useContext(AppContext);
//   if (!user) return <p>Loading profile...</p>;

//   const avatar = user.username ? user.username.charAt(0).toUpperCase() : "?";

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto", background: "#fff", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center" }}>
//       <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#135bec", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
//         {user.profileImage ? <img src={user.profileImage} alt={user.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : avatar}
//       </div>
//       <h2 style={{ marginBottom: "10px" }}>{user.username}</h2>
//       <p><strong>Email:</strong> {user.email}</p>
//     </div>
//   );
// };

// // ================== MAIN CONTENT ==================
// const Content = () => {
//   const { page, message, user, activeTab, setActiveTab, logout, cart, totalItems, search, setSearch } = useContext(AppContext);

//   return (
//     <div className="page">
//       {page !== "me" && (
//         <div className="card">
//           {message && <div className="message">{message}</div>}
//           {page === "register" && <Register />}
//           {page === "login" && <Login />}
//         </div>
//       )}

//       {page === "me" && user && (
//         <div className="full-page">
//           <div className="tabs">
//             <span className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>Home</span>
//             <span className={activeTab === "products" ? "active" : ""} onClick={() => setActiveTab("products")}>Products</span>
//             <span className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</span>
//             <span className={activeTab === "cart" ? "active" : ""} onClick={() => setActiveTab("cart")}>
//               🛒 {totalItems > 0 && `(${totalItems})`}
//             </span>
//             <input
//               className="search-bar"
//               placeholder="Search products..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             <span className="logout" onClick={logout}>Logout</span>
//           </div>
//           <div className="content">
//             {activeTab === "home" && <HomePage />}
//             {activeTab === "products" && <ProductSearchPage />}
//             {activeTab === "profile" && <ProfilePage />}
//             {activeTab === "cart" && <CartPage />}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ================== MAIN APP ==================
// export default function App() {
//   return (
//     <AppProvider>
//       <style>{`
//         * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
//         body, html, #root { margin: 0; height: 100%; }
//         .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f3f4f6; }
//         .card { width: 420px; background: #0d256e; padding: 40px; border-radius: 16px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; }
//         .full-page { width: 100%; height: 100vh; display: flex; flex-direction: column; }
//         .tabs { display: flex; align-items: center; background: #001f4d; padding: 10px; gap: 10px; }
//         .tabs span { color: white; font-weight: bold; cursor: pointer; }
//         .tabs .active { border-bottom: 2px solid white; }
//         .tabs .logout { margin-left: auto; cursor: pointer; }
//         .search-bar { padding: 6px 10px; border-radius: 6px; border: none; }
//         .content { flex: 1; background: #f3f4f6; overflow: auto; padding: 20px; }
//         .title { text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 24px; }
//         input { width: 100%; padding: 14px; border-radius: 6px; border: none; margin-bottom: 16px; background: #e8edf5; }
//         button { width: 100%; padding: 14px; background: black; color: white; font-weight: bold; border: none; cursor: pointer; }
//         button:hover { opacity: 0.9; }
//         .switch { text-align: center; margin-top: 16px; cursor: pointer; }
//         .message { margin-top: 12px; text-align: center; font-size: 14px; }
//       `}</style>
//       <Content />
//     </AppProvider>
//   );
// }


import React, { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [page, setPage] = useState("login");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
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

  // INPUT HANDLERS
  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  // CART LOGIC
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
        loginData,
        handleLoginChange,
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
