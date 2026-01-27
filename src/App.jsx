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
//         search,
//         setSearch,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // ================== COMPONENTS ==================
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

// const HomePage = () => (
//   <div>
//     <FlipMartHome/>
    
//   </div>
// );

// // const ProductPage = () => {
// //   const { addToCart, search } = useContext(AppContext);
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     const demoProducts = [
// //       { id: 1, name: "iPhone 15", price: 999, image: "https://via.placeholder.com/150" },
// //       { id: 2, name: "MacBook Pro", price: 1999, image: "https://via.placeholder.com/150" },
// //       { id: 3, name: "Sony Headphones", price: 199, image: "https://via.placeholder.com/150" },
// //       { id: 4, name: "Samsung Galaxy S24", price: 899, image: "https://via.placeholder.com/150" },
// //       { id: 5, name: "Nike Sneakers", price: 149, image: "https://via.placeholder.com/150" },
// //     ];
// //     setProducts(demoProducts);
// //   }, []);

// //   const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

// //   return (
// //     <div>
// //       <h2>Products</h2>
// //       {filtered.length === 0 ? <p>No products found.</p> : (
// //         <div className="product-grid">
// //           {filtered.map(p => (
// //             <div key={p.id} className="product-card">
// //               <img src={p.image} alt={p.name} />
// //               <h3>{p.name}</h3>
// //               <p>${p.price}</p>
// //               <button onClick={() => addToCart(p)}>Add to Cart</button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

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
//               <img src={item.image} alt={item.name} />
//               <div className="cart-info">
//                 <h4>{item.name}</h4>
//                 <p>${item.price}</p>
//                 <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
//                   <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item.id, Number(e.target.value))} />
//                   <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <h3>Total: ${cartTotal}</h3>
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

//   const avatarStyle = {
//     width: "100px",
//     height: "100px",
//     borderRadius: "50%",
//     backgroundColor: "#135bec",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
//     fontSize: "36px",
//     fontWeight: "bold",
//     marginBottom: "20px",
//     overflow: "hidden",
//   };

//   const containerStyle = {
//     maxWidth: "400px",
//     margin: "50px auto",
//     background: "#fff",
//     borderRadius: "12px",
//     padding: "30px",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//     textAlign: "center",
//     fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//   };

//   const infoStyle = {
//     textAlign: "left",
//     marginTop: "20px",
//     lineHeight: 1.6,
//   };

//   const usernameAvatar = user?.username ? user.username.charAt(0).toUpperCase() : "?";

//   return (
//     <div style={containerStyle}>
//       {user ? (
//         <>
//           <div style={avatarStyle}>
//             {user.profileImage ? (
//               <img
//                 src={user.profileImage}
//                 alt={user.username}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               usernameAvatar
//             )}
//           </div>
//           <h2 style={{ marginBottom: "10px" }}>{user.username}</h2>
//           <div style={infoStyle}>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             {user.bio && (
//               <p>
//                 <strong>Bio:</strong> {user.bio}
//               </p>
//             )}
//             {user.joinDate && (
//               <p>
//                 <strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}
//               </p>
//             )}
//           </div>
//         </>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };
// // const ProfilePage = () => {
// //   const { user } = useContext(AppContext);
// //   return (
// //     <div>
// //       <h2>Profile</h2>
// //       {user ? (
// //         <div>
// //           <p><strong>Username:</strong> {user.username}</p>
// //           <p><strong>Email:</strong> {user.email}</p>
// //         </div>
// //       ) : <p>Loading profile...</p>}
// //     </div>
// //   );
// // };

// // ================== MAIN CONTENT ==================
// const Content = () => {
//   const { page, message, user, activeTab, setActiveTab, logout, cart, search, setSearch } = useContext(AppContext);

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
//               🛒 {cart.length > 0 && `(${cart.length})`}
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
//             {activeTab === "profile" && <><ProfilePage /></>}
//             {activeTab === "cart" && <ShoppingCart/>}
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
//         .product-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 20px; margin-top: 20px; }
//         .product-card { background: white; padding: 16px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
//         .product-card img { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; }
//         .product-card h3 { font-size: 16px; margin: 8px 0; }
//         .product-card p { font-weight: bold; margin-bottom: 8px; }
//         .product-card button { padding: 8px 12px; font-weight: bold; background: #0d256e; color: white; border: none; border-radius: 6px; cursor: pointer; }
//         .product-card button:hover { opacity: 0.9; }
//         .cart-item { display: flex; align-items: center; margin-bottom: 16px; background: white; padding: 10px; border-radius: 10px; }
//         .cart-item img { width: 100px; height: 80px; object-fit: cover; border-radius: 6px; margin-right: 10px; }
//         .cart-info { flex: 1; }
//         .cart-info input { width: 60px; margin-right: 10px; }
//         .remove-btn { background: red; padding: 4px 8px; border-radius: 6px; border: none; color: white; cursor: pointer; }
//         .remove-btn:hover { opacity: 0.8; }
//       `}</style>
//       <Content />
//     </AppProvider>
//   );
// }





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
// //   const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0); // total quantity
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
// //         totalItems,
// //         search,
// //         setSearch,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };

// // // ================== PAGES / COMPONENTS ==================
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

// // const HomePage = () => <FlipMartHome />;

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
// //               <img src={item.thumbnail || item.image} alt={item.name} />
// //               <div className="cart-info">
// //                 <h4>{item.name}</h4>
// //                 <p>₹{item.price.toLocaleString()}</p>
// //                 <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
// //                   <input type="number" min="1" value={item.quantity} onChange={e => updateQuantity(item.id, Number(e.target.value))} />
// //                   <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //           <h3>Total: ₹{cartTotal.toLocaleString()}</h3>
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
// //   if (!user) return <p>Loading profile...</p>;

// //   const avatar = user.username ? user.username.charAt(0).toUpperCase() : "?";

// //   return (
// //     <div style={{ maxWidth: "400px", margin: "50px auto", background: "#fff", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center" }}>
// //       <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#135bec", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
// //         {user.profileImage ? <img src={user.profileImage} alt={user.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : avatar}
// //       </div>
// //       <h2 style={{ marginBottom: "10px" }}>{user.username}</h2>
// //       <p><strong>Email:</strong> {user.email}</p>
// //     </div>
// //   );
// // };

// // // ================== MAIN CONTENT ==================
// // const Content = () => {
// //   const { page, message, user, activeTab, setActiveTab, logout, cart, totalItems, search, setSearch } = useContext(AppContext);

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
// //               🛒 {totalItems > 0 && `(${totalItems})`}
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
// //             {activeTab === "profile" && <ProfilePage />}
// //             {activeTab === "cart" && <CartPage />}
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
// //       `}</style>
// //       <Content />
// //     </AppProvider>
// //   );
// // }


// // import React, { createContext, useState, useContext, useEffect } from "react";

// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [page, setPage] = useState("login");
// //   const [message, setMessage] = useState("");
// //   const [user, setUser] = useState(null);
// //   const [activeTab, setActiveTab] = useState("home");
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

// //   // INPUT HANDLERS
// //   const handleRegisterChange = (e) =>
// //     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
// //   const handleLoginChange = (e) =>
// //     setLoginData({ ...loginData, [e.target.name]: e.target.value });

// //   // CART LOGIC
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
// //   const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
// //   const cartTotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

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
// //         loginData,
// //         handleLoginChange,
// //         cart,
// //         addToCart,
// //         removeFromCart,
// //         updateQuantity,
// //         clearCart,
// //         totalItems,
// //         cartTotal,
// //         search,
// //         setSearch,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };



import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import PRODUCTS from "./data"
import FlipMartHome from './FlipMartHome';
/* =======================
   REDUX – AUTH
======================= */
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        name,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

/* =======================
   REDUX – CART
======================= */
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], orderConfirmed: false },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    changeQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.type === "inc") item.quantity += 1;
        if (action.payload.type === "dec" && item.quantity > 1) item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    confirmOrder(state) {
      state.items = [];
      state.orderConfirmed = true;
    },
  },
});

/* =======================
   STORE
======================= */
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

/* =======================
   NAVBAR
======================= */


function Navbar({ onSearch }) {
  const user = useSelector((s) => s.user.currentUser);
  const cartCount = useSelector((s) => s.cart.items.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">FlipMart</Link>

        {user && (
          <>
            <Link to="/products">Products</Link>
            {cartCount > 0 && <Link to="/cart">Cart ({cartCount})</Link>}
            {/* SEARCH BAR */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="search-bar"
            />
          </>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="username">Hello, {user.name}</span>
            <button
              className="btn logout-btn"
              onClick={() => {
                dispatch(userSlice.actions.logout());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn signup-btn">Sign Up</Link>
          </>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: #0d256e;
          color: white;
          flex-wrap: wrap;
          gap: 12px;
        }
        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .logo { font-weight: 800; font-size: 22px; color: #ffd700; text-decoration: none; }
        .nav-left a { text-decoration: none; color: white; font-weight: 500; padding: 6px 12px; border-radius: 6px; transition: 0.2s; }
        .nav-left a:hover { background: rgba(0,0,0,0.915); }
        .search-bar { padding: 6px 10px; border-radius: 6px; border: none; outline: none; }
        .username { margin-right: 12px; font-weight: 500; }
        .btn { padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; transition: 0.2s; }
        .login-btn { background: #ffd700; color: #0d256e; }
        .signup-btn { background: #ffffff; color: #0d256e; }
        .logout-btn { background: #ff4d4d; color: white; }
        .btn:hover { opacity: 0.9; }
      `}</style>
    </nav>
  );
}




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ email, password }));
    if (!res.error) navigate("/"); // navigate to homepage after login
  };

  return (
    <div className="page">
      <div className="card">
        {/* TITLE */}
        <div className="title">Account Login</div>
        <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "17px", opacity: 0.85 }}>
          Sign in to your account
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* SWITCH TO REGISTER */}
        <div className="switch" onClick={() => navigate("/register")}>
          Don't have an account? <b>Sign Up</b>
        </div>

        {/* FORGOT PASSWORD */}
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", opacity: 0.8 }}>
          Forgot Password?
        </div>

        {/* OPTIONAL FORGOT PASSWORD UI */}
        <div style={{ marginTop: "40px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "16px", textAlign: "center" }}>
            Forgot Your Password
          </div>
          <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "12px", textAlign: "center" }}>
            We'll email you instructions on how to reset your password
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          />
          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset Password →
          </button>
        </div>
      </div>

      {/* CSS Styling */}
      <style>{`
        * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body, html, #root { margin: 0; height: 100%; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f3f4f6; padding: 20px; }
        .card { width: 100%; max-width: 500px; background: #0d256e; padding: 40px; border-radius: 16px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; }
        .title { text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 24px; }
        input { width: 100%; padding: 14px; border-radius: 6px; border: none; margin-bottom: 16px; background: #e8edf5; color: #0d256e; font-weight: 500; }
        input::placeholder { color: #0d256e; opacity: 0.7; }
        button { width: 100%; padding: 14px; background: black; color: white; font-weight: bold; border: none; cursor: pointer; border-radius: 8px; transition: 0.2s; }
        button:hover { opacity: 0.9; }
        .switch { text-align: center; margin-top: 16px; cursor: pointer; }
        .switch b { color: #ffd700; }
        .switch b:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}



 function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const res = await dispatch(registerUser({ name, email, password }));
    if (!res.error) navigate("/login");
  };

  return (
    <div className="page">
      <div className="card">
        <div className="title">Sign Up</div>
        <div style={{ textAlign: "center", marginBottom: "20px", fontSize: "17px", opacity: 0.85 }}>
          Create your account
        </div>

        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <div className="switch" onClick={() => navigate("/login")}>
          Already have an account? <b>Sign in</b>
        </div>
      </div>

      {/* CSS Styling */}
      <style>{`
        * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body, html, #root { margin: 0; height: 100%; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f3f4f6; }
        .card { width: 420px; background: #0d256e; padding: 40px; border-radius: 16px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; }
        .title { text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 24px; }
        input { width: 100%; padding: 14px; border-radius: 6px; border: none; margin-bottom: 16px; background: #e8edf5; color: #0d256e; font-weight: 500; }
        input::placeholder { color: #0d256e; opacity: 0.7; }
        button { width: 100%; padding: 14px; background: black; color: white; font-weight: bold; border: none; cursor: pointer; border-radius: 8px; transition: 0.2s; }
        button:hover { opacity: 0.9; }
        .switch { text-align: center; margin-top: 16px; cursor: pointer; }
        .switch b { color: #ffd700; }
        .switch b:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
/* =======================
   HOME
======================= */
function Home() {
  
  return <div><FlipMartHome/></div>;
}

/* =======================
   PRODUCTS
======================= */



// function Products() {
//   const dispatch = useDispatch();
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter products based on search input
//   const filteredProducts = PRODUCTS.filter(
//     (p) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.brand.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="products-page">
//       {/* <Navbar onSearch={(value) => setSearchTerm(value)} /> */}

//       <h2 className="products-title">Best Electronics for You</h2>

//       <div className="product-grid">
//         {filteredProducts.map((p) => (
//           <div key={p.id} className="product-card">
//             <div className="product-image-wrapper">
//               <img src={p.images[0]} alt={p.name} className="product-image" />
//             </div>
//             <div className="product-info">
//               <h3 className="product-name">{p.name}</h3>
//               <p className="product-brand">{p.brand}</p>
//               <div className="price-box">
//                 <span className="price">₹{p.price.toLocaleString()}</span>
//                 <span className="original-price">₹{p.originalPrice.toLocaleString()}</span>
//                 <span className="discount">{p.discount}% off</span>
//               </div>
//               <p className="rating">⭐ {p.rating} ({p.reviewsCount})</p>
//               <button
//                 className="btn primary details-btn"
//                 onClick={() => setSelectedProduct(p)}
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PRODUCT MODAL */}
//       {selectedProduct && (
//         <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//           <div className="modal-box" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
//             <div className="modal-content">
//               <div className="modal-images">
//                 {selectedProduct.images.map((img, idx) => (
//                   <img key={idx} src={img} alt={${selectedProduct.name} ${idx}} />
//                 ))}
//               </div>
//               <div className="modal-info">
//                 <h2>{selectedProduct.name}</h2>
//                 <p className="modal-price">₹{selectedProduct.price.toLocaleString()}</p>
//                 <p className="modal-description">{selectedProduct.description}</p>
//                 <ul className="modal-highlights">
//                   {selectedProduct.highlights.map((h, i) => <li key={i}>✔ {h}</li>)}
//                 </ul>
//                 <button
//                   className="btn primary"
//                   onClick={() => {
//                     dispatch(cartSlice.actions.addToCart(selectedProduct));
//                     setSelectedProduct(null);
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CSS Styling */}
//       <style>{`
//         .products-page { padding: 20px; }
//         .products-title { font-size: 24px; margin-bottom: 16px; text-align: center; }
//         .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
//         .product-card { background: white; padding: 12px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; flex-direction: column; }
//         .product-image-wrapper { width: 100%; padding-top: 100%; position: relative; margin-bottom: 8px; }
//         .product-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; }
//         .product-name { font-size: 18px; font-weight: 600; }
//         .product-brand { font-size: 14px; color: #555; margin-bottom: 8px; }
//         .price-box { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
//         .price { font-weight: bold; }
//         .original-price { text-decoration: line-through; color: #888; font-size: 14px; }
//         .discount { color: green; font-weight: 600; font-size: 14px; }
//         .rating { font-size: 14px; margin-bottom: 8px; }
//         .btn.primary { padding: 8px 12px; background: #0d256e; color: white; border-radius: 6px; border: none; cursor: pointer; }
//         .btn.primary:hover { opacity: 0.9; }
//         .modal-overlay { position: fixed; top: 0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; }
//         .modal-box { background:white; padding:20px; border-radius:12px; max-width:800px; width:100%; display:flex; gap:16px; position:relative; }
//         .modal-close { position:absolute; top:10px; right:10px; background:none; border:none; font-size:20px; cursor:pointer; }
//         .modal-images { display:flex; flex-direction:column; gap:8px; flex:1; }
//         .modal-images img { width:100%; border-radius:6px; object-fit:cover; }
//         .modal-info { flex:2; display:flex; flex-direction:column; gap:12px; }
//         .modal-highlights { list-style:none; padding-left:0; }
//         .modal-highlights li { margin-bottom:4px; }
//       `}</style>
//     </div>
//   );
// }


function Products() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search input
  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      <h2 className="products-title">Best Electronics for You</h2>

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-image-wrapper">
              <img
                src={p.images[0]}
                alt={p.name}
                className="product-image"
              />
            </div>

            <div className="product-info">
              <h3 className="product-name">{p.name}</h3>
              <p className="product-brand">{p.brand}</p>

              <div className="price-box">
                <span className="price">₹{p.price.toLocaleString()}</span>
                <span className="original-price">
                  ₹{p.originalPrice.toLocaleString()}
                </span>
                <span className="discount">{p.discount}% off</span>
              </div>

              <p className="rating">
                ⭐ {p.rating} ({p.reviewsCount})
              </p>

              <button
                className="btn primary"
                onClick={() => setSelectedProduct(p)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="modal-content">
              <div className="modal-images">
                {selectedProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedProduct.name} ${idx}`}
                  />
                ))}
              </div>

              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-price">
                  ₹{selectedProduct.price.toLocaleString()}
                </p>

                <p className="modal-description">
                  {selectedProduct.description}
                </p>

                <ul className="modal-highlights">
                  {selectedProduct.highlights.map((h, i) => (
                    <li key={i}>✔ {h}</li>
                  ))}
                </ul>

                <button
                  className="btn primary"
                  onClick={() => {
                    dispatch(cartSlice.actions.addToCart(selectedProduct));
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
        .products-page { padding: 20px; }
        .products-title { font-size: 24px; margin-bottom: 16px; text-align: center; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        .product-card { background: white; padding: 12px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .product-image-wrapper { width: 100%; padding-top: 100%; position: relative; }
        .product-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
        .price-box { display: flex; gap: 8px; align-items: center; }
        .original-price { text-decoration: line-through; color: #888; }
        .discount { color: green; font-weight: bold; }
        .btn.primary { background: #0d256e; color: white; padding: 8px 12px; border-radius: 6px; border: none; cursor: pointer; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .modal-box { background: white; padding: 20px; border-radius: 12px; max-width: 800px; width: 100%; position: relative; }
        .modal-close { position: absolute; top: 10px; right: 10px; font-size: 20px; background: none; border: none; cursor: pointer; }
      `}</style>
    </div>
  );
}

/* =======================
   CART
======================= */

// function Cart() {
//   const { items, orderConfirmed } = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.user.currentUser);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (orderConfirmed) {
//     return (
//       <div className="cart-page empty-cart">
//         <h2>✅ Order Confirmed!</h2>
//         <p>Your order has been placed successfully.</p>
//         <button className="btn primary" onClick={() => navigate("/")}>
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <h2 className="cart-title">Your Shopping Cart</h2>

//       {items.length === 0 && <p className="empty-msg">Your cart is empty 🛒</p>}

//       <div className="cart-items">
//         {items.map((item) => (
//           <div key={item.id} className="cart-item">
//             <div className="cart-item-image">
//               <img src={item.images?.[0] || "https://via.placeholder.com/100"} alt={item.name} />
//             </div>
//             <div className="cart-item-details">
//               <h3 className="cart-item-name">{item.name}</h3>
//               <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
//               <div className="quantity-controls">
//                 <button
//                   className="qty-btn"
//                   onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "dec" }))}
//                   disabled={item.quantity === 1}
//                 >−</button>
//                 <span className="qty-number">{item.quantity}</span>
//                 <button
//                   className="qty-btn"
//                   onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "inc" }))}
//                 >+</button>
//               </div>
//               <button className="btn danger remove-btn" onClick={() => dispatch(cartSlice.actions.removeFromCart(item.id))}>
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {items.length > 0 && (
//         <div className="cart-footer">
//           <div className="total-box">
//             <h3>Total:</h3>
//             <h3>₹{total.toLocaleString()}</h3>
//           </div>
//           <div className="cart-actions">
//             <button className="btn danger" onClick={() => dispatch(cartSlice.actions.clearCart())}>
//               Clear Cart
//             </button>
//             <button
//               className="btn primary"
//               onClick={() => {
//                 if (!user) navigate("/login");
//                 else dispatch(cartSlice.actions.confirmOrder());
//               }}
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// function Cart() {
//   const { items, orderConfirmed } = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.user.currentUser);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showCheckout, setShowCheckout] = useState(false);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (orderConfirmed) {
//     return (
//       <div className="cart-page empty-cart">
//         <h2>✅ Order Confirmed!</h2>
//         <p>Your order has been placed successfully.</p>
//         <button className="btn primary" onClick={() => navigate("/")}>
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <h2 className="cart-title">Your Shopping Cart</h2>

//       {items.length === 0 && (
//         <p className="empty-msg">Your cart is empty 🛒</p>
//       )}

//       <div className="cart-items">
//         {items.map((item) => (
//           <div key={item.id} className="cart-item">
//             <img
//               src={item.images?.[0]}
//               alt={item.name}
//               className="cart-img"
//             />

//             <div className="cart-item-details">
//               <h3>{item.name}</h3>
//               <p>₹{item.price.toLocaleString()}</p>

//               <div className="quantity-controls">
//                 <button
//                   onClick={() =>
//                     dispatch(
//                       cartSlice.actions.changeQuantity({
//                         id: item.id,
//                         type: "dec",
//                       })
//                     )
//                   }
//                   disabled={item.quantity === 1}
//                 >
//                   −
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() =>
//                     dispatch(
//                       cartSlice.actions.changeQuantity({
//                         id: item.id,
//                         type: "inc",
//                       })
//                     )
//                   }
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 className="btn danger"
//                 onClick={() =>
//                   dispatch(cartSlice.actions.removeFromCart(item.id))
//                 }
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {items.length > 0 && (
//         <div className="cart-footer">
//           <h3>Total: ₹{total.toLocaleString()}</h3>

//           <button
//             className="btn primary"
//             onClick={() => {
//               if (!user) navigate("/login");
//               else setShowCheckout(true);
//             }}
//           >
//             Place Order
//           </button>
//         </div>
//       )}

//       {/* 🔔 CHECKOUT MODAL */}
//       {showCheckout && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h2>Checkout</h2>

//             <label>Shipping Address</label>
//             <textarea
//               placeholder="Enter full delivery address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />

//             <label>Payment Method</label>
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="cod">Cash on Delivery</option>
//               <option value="upi">UPI</option>
//               <option value="card">Credit / Debit Card</option>
//             </select>

//             <p className="pay-amount">
//               Payable Amount: <strong>₹{total.toLocaleString()}</strong>
//             </p>

//             <div className="modal-actions">
//               <button
//                 className="btn danger"
//                 onClick={() => setShowCheckout(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="btn primary"
//                 onClick={() => {
//                   if (!address) {
//                     alert("Please enter shipping address");
//                     return;
//                   }
//                   setShowCheckout(false);
//                   dispatch(cartSlice.actions.confirmOrder());
//                 }}
//               >
//                 Pay Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* BASIC STYLES */}
//       <style>{`
//         .cart-img { width: 100px; }
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.6);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .modal-box {
//           background: #fff;
//           padding: 20px;
//           width: 400px;
//           border-radius: 10px;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         textarea {
//           min-height: 80px;
//           padding: 8px;
//         }
//         select {
//           padding: 8px;
//         }
//         .modal-actions {
//           display: flex;
//           justify-content: space-between;
//         }
//       `}</style>
//     </div>
//   );
// }







// function Cart() {
//   const { items, orderConfirmed } = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.user.currentUser);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showCheckout, setShowCheckout] = useState(false);
//   const [step, setStep] = useState(1);
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (orderConfirmed) {
//     return (
//       <div className="order-success">
//         <h2>🎉 Order Placed Successfully</h2>
//         <p>Thank you for shopping with us.</p>
//         <button className="btn primary" onClick={() => navigate("/")}>
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <h2>Your Cart</h2>

//       {items.length === 0 && <p>Your cart is empty 🛒</p>}

//       {items.map((item) => (
//         <div key={item.id} className="cart-item">
//           <img src={item.images?.[0]} alt={item.name} />
//           <div>
//             <h4>{item.name}</h4>
//             <p>₹{item.price.toLocaleString()}</p>
//           </div>
//         </div>
//       ))}

//       {items.length > 0 && (
//         <div className="cart-footer">
//           <h3>Total: ₹{total.toLocaleString()}</h3>
//           <button
//             className="btn primary"
//             onClick={() => {
//               if (!user) navigate("/login");
//               else setShowCheckout(true);
//             }}
//           >
//             Place Order
//           </button>
//         </div>
//       )}

//       {/* 🚀 ADVANCED CHECKOUT MODAL */}
//       {showCheckout && (
//         <div className="checkout-overlay">
//           <div className="checkout-modal">
//             <div className="checkout-header">
//               <h3>Checkout</h3>
//               <button onClick={() => setShowCheckout(false)}>✕</button>
//             </div>

//             {/* STEPS */}
//             <div className="steps">
//               <span className={step === 1 ? "active" : ""}>Address</span>
//               <span className={step === 2 ? "active" : ""}>Payment</span>
//               <span className={step === 3 ? "active" : ""}>Confirm</span>
//             </div>

//             {/* STEP 1 */}
//             {step === 1 && (
//               <div className="step-content">
//                 <h4>Shipping Address</h4>
//                 <textarea
//                   placeholder="House no, Street, City, Pincode"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//                 <button
//                   className="btn primary"
//                   disabled={!address}
//                   onClick={() => setStep(2)}
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}

//             {/* STEP 2 */}
//             {step === 2 && (
//               <div className="step-content">
//                 <h4>Select Payment Method</h4>

//                 <div className="payment-options">
//                   {["cod", "upi", "card"].map((method) => (
//                     <div
//                       key={method}
//                       className={`payment-card ${
//                         paymentMethod === method ? "selected" : ""
//                       }`}
//                       onClick={() => setPaymentMethod(method)}
//                     >
//                       {method === "cod" && "💵 Cash on Delivery"}
//                       {method === "upi" && "📱 UPI"}
//                       {method === "card" && "💳 Card"}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="actions">
//                   <button onClick={() => setStep(1)}>Back</button>
//                   <button className="btn primary" onClick={() => setStep(3)}>
//                     Continue
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3 */}
//             {step === 3 && (
//               <div className="step-content">
//                 <h4>Order Summary</h4>
//                 <p><strong>Address:</strong> {address}</p>
//                 <p><strong>Payment:</strong> {paymentMethod.toUpperCase()}</p>
//                 <p className="total">₹{total.toLocaleString()}</p>

//                 <div className="actions">
//                   <button onClick={() => setStep(2)}>Back</button>
//                   <button
//                     className="btn primary"
//                     onClick={() => {
//                       dispatch(cartSlice.actions.confirmOrder());
//                       setShowCheckout(false);
//                     }}
//                   >
//                     Pay Now
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* 🎨 MODERN UI STYLES */}
//       <style>{`
//         .checkout-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,.6);
//           backdrop-filter: blur(6px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }
//         .checkout-modal {
//           background: #fff;
//           width: 480px;
//           border-radius: 16px;
//           padding: 20px;
//           animation: slideUp .3s ease;
//         }
//         @keyframes slideUp {
//           from { transform: translateY(40px); opacity:0 }
//           to { transform: translateY(0); opacity:1 }
//         }
//         .checkout-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }
//         .steps {
//           display: flex;
//           justify-content: space-between;
//           margin: 16px 0;
//         }
//         .steps span {
//           flex:1;
//           text-align:center;
//           padding:6px;
//           border-bottom:2px solid #ddd;
//         }
//         .steps .active {
//           border-color:#0d256e;
//           font-weight:600;
//         }
//         textarea {
//           width:100%;
//           min-height:80px;
//           padding:10px;
//           border-radius:8px;
//           border:1px solid #ccc;
//         }
//         .payment-options {
//           display:grid;
//           grid-template-columns:1fr;
//           gap:10px;
//         }
//         .payment-card {
//           padding:12px;
//           border-radius:10px;
//           border:1px solid #ccc;
//           cursor:pointer;
//         }
//         .payment-card.selected {
//           border-color:#0d256e;
//           background:#f0f4ff;
//         }
//         .actions {
//           display:flex;
//           justify-content:space-between;
//           margin-top:16px;
//         }
//         .btn.primary {
//           background:#0d256e;
//           color:white;
//           border:none;
//           padding:10px 14px;
//           border-radius:8px;
//           cursor:pointer;
//         }
//         .total {
//           font-size:20px;
//           font-weight:700;
//           margin-top:10px;
//         }
//       `}</style>
//     </div>
//   );
// }




function Cart() {
  const { items, orderConfirmed } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {items.length === 0 && <p>Your cart is empty 🛒</p>}

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.images?.[0]} alt={item.name} />
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price.toLocaleString()}</p>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-footer">
          <h3>Total: ₹{total.toLocaleString()}</h3>
          <button
            className="btn primary"
            onClick={() => {
              if (!user) navigate("/login");
              else setShowCheckout(true);
            }}
          >
            Place Order
          </button>
        </div>
      )}

      {/* ✅ ORDER SUCCESS POPUP */}
      {orderConfirmed && (
        <div className="modal-overlay">
          <div className="order-success modal">
            <h2>🎉 Order Placed Successfully</h2>
            <p>Thank you for shopping with us.</p>
            <button
              className="btn primary"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* 🚀 CHECKOUT MODAL */}
      {showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <div className="checkout-header">
              <h3>Checkout</h3>
              <button onClick={() => setShowCheckout(false)}>✕</button>
            </div>

            <div className="steps">
              <span className={step === 1 ? "active" : ""}>Address</span>
              <span className={step === 2 ? "active" : ""}>Payment</span>
              <span className={step === 3 ? "active" : ""}>Confirm</span>
            </div>

            {step === 1 && (
              <div className="step-content">
                <textarea
                  placeholder="House no, Street, City, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  className="btn primary"
                  disabled={!address}
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                {["cod", "upi", "card"].map((method) => (
                  <div
                    key={method}
                    className={`payment-card ${
                      paymentMethod === method ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method.toUpperCase()}
                  </div>
                ))}
                <div className="actions">
                  <button onClick={() => setStep(1)}>Back</button>
                  <button className="btn primary" onClick={() => setStep(3)}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Payment:</strong> {paymentMethod}</p>
                <p className="total">₹{total.toLocaleString()}</p>
                <div className="actions">
                  <button onClick={() => setStep(2)}>Back</button>
                  <button
                    className="btn primary"
                    onClick={() => {
                      dispatch(cartSlice.actions.confirmOrder());
                      setShowCheckout(false);
                    }}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🎨 POPUP + CHECKOUT STYLES */}
        <style>{`
         .checkout-overlay {
           position: fixed;
           inset: 0;
           background: rgba(0,0,0,.6);
           backdrop-filter: blur(6px);
           display: flex;
           align-items: center;
           justify-content: center;
           z-index: 1000;
         }
         .checkout-modal {
           background: #fff;
           width: 480px;
           border-radius: 16px;
           padding: 20px;
           animation: slideUp .3s ease;
         }
         @keyframes slideUp {
           from { transform: translateY(40px); opacity:0 }
           to { transform: translateY(0); opacity:1 }
         }
         .checkout-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
         }
         .steps {
           display: flex;
           justify-content: space-between;
           margin: 16px 0;
         }
         .steps span {
           flex:1;
           text-align:center;
           padding:6px;
           border-bottom:2px solid #ddd;
         }
         .steps .active {
           border-color:#0d256e;
           font-weight:600;
         }
         textarea {
           width:100%;
           min-height:80px;
           padding:10px;
           border-radius:8px;
           border:1px solid #ccc;
         }
         .payment-options {
           display:grid;
           grid-template-columns:1fr;
           gap:10px;
         }
         .payment-card {
           padding:12px;
           border-radius:10px;
           border:1px solid #ccc;
           cursor:pointer;
         }
         .payment-card.selected {
           border-color:#0d256e;
           background:#f0f4ff;
         }
         .actions {
           display:flex;
           justify-content:space-between;
           margin-top:16px;
         }
         .btn.primary {
           background:#0d256e;
           color:white;
           border:none;
           padding:10px 14px;
           border-radius:8px;
           cursor:pointer;
         }
         .total {
           font-size:20px;
           font-weight:700;
           margin-top:10px;
         }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.6);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1200;
        }
        .modal {
          background:#fff;
          padding:2rem;
          border-radius:14px;
          text-align:center;
          animation: pop .3s ease;
        }
        @keyframes pop {
          from { transform:scale(.8); opacity:0 }
          to { transform:scale(1); opacity:1 }
        }
      `}</style>
    </div>
  );
}











/* =======================
   APP
======================= */
function App() {
  const user = useSelector((s) => s.user.currentUser);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

/* =======================
   ROOT
======================= */
export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}