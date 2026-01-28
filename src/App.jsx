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



import React, { useEffect, useRef, useState } from "react";
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
// import FlipMartHome from './FlipMartHome';



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
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
},
});
const initialState = {
  allProducts: PRODUCTS,
  filteredProducts: PRODUCTS,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter(
        (p) =>
          p.name.toLowerCase().startsWith(searchTerm) ||
          p.brand.toLowerCase().startsWith(searchTerm)
      );
    },
    clearFilter: (state) => {
      state.filteredProducts = state.allProducts;
    },
  },
});

/* =======================
   REDUX – CART
======================= */

// ✅ Load cart from localStorage if available
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,      // load saved items
    orderConfirmed: false, // reset on page load
  },
  reducers: {
    addToCart(state, action) {
      // reset order confirmation when adding new item
      state.orderConfirmed = false;

      const existing = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // ✅ save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    changeQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.type === "inc") item.quantity += 1;
        if (action.payload.type === "dec" && item.quantity > 1) item.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },

    confirmOrder(state) {
      state.items = [];
      state.orderConfirmed = true;
      localStorage.removeItem("cart");
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
    products: productSlice.reducer,
  },
});
/* =======================
   NAVBAR
======================= */
function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const cartCount = useSelector((state) => state.cart.items.length || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          FlipMart
        </Link>

        {user && (
          <>
            <Link to="/products">Products</Link>
            {cartCount > 0 && <Link to="/cart">Cart ({cartCount})</Link>}
          </>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="username">Hello, {user.username}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">
              Login
            </Link>
            <Link to="/register" className="btn signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
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


    </div>
  );
}
/* =======================
   HOME
======================= */
function Home() {
  return <div><FlipMartHome/></div>;
}



function FlipMartHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);

  // ✅ Category Sections Component
  const CategorySections = ({ products }) => {
    const categorySections = [
      { title: "Mobiles & Accessories", filter: { level1: "electronics", level2: "mobiles-tablets" } },
      { title: "Laptops & Gaming", filter: { level1: "electronics", level2: "laptops-desktops-gaming" } },
      { title: "TVs & Appliances", filter: { level1: "electronics", level2: "tv-audio-appliances" } },
      { title: "Fashion & Lifestyle", filter: { level1: "fashion-lifestyle" } },
      { title: "Grocery & Daily Needs", filter: { level1: "grocery-daily-needs" } },
      { title: "Home & Kitchen", filter: { level1: "home-kitchen-furniture" } },
      { title: "Beauty & Health", filter: { level1: "beauty-health-wellness" } },
      { title: "Sports, Fitness & Outdoor", filter: { level1: "sports-fitness-outdoor" } },
    ];

    return categorySections.map((cat, idx) => (
      <section className="section" key={idx}>
        <div className="section-header">
          <h2>{cat.title}</h2>
        </div>

        <div className="products">
          {products
            .filter(p => {
              if (!p.category) return false;
              return Object.keys(cat.filter).every(level => p.category[level] === cat.filter[level]);
            })
            .map((p, i) => (
              <div className="product" key={i}>
                <img src={p.images[0]} alt={p.name} />
                <h4>{p.name}</h4>
                <div className="price">₹{p.price}</div>
                <div className="sub">{p.brand}</div>
              </div>
            ))}
        </div>
      </section>
    ));
  };

  return (
    <>
      {/* GOOGLE FONTS */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      {/* STYLES */}
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Inter,sans-serif;background:#f1f3f6;color:#0d121b}
        img{max-width:100%;display:block}
        main{max-width:1280px;margin:auto;padding:20px;display:flex;flex-direction:column;gap:20px}

        /* HERO */
        .hero{height:300px;border-radius:8px;
          background:
            linear-gradient(to right, rgba(0,0,0,.6), transparent),
            url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIaxtUa_uLHLhnUF9ztYjDdNDdXfC8a8e7y0DrN3qsNmq98T1jOZhISldyVT1HT-15zAef2OmEMxKuOEnhj5aVgMbNG3NNpsoNcxnlRa2boB03308DAjmYVWo68ZKZK02ZIyOUjiePLlbKMsFsNfhfsyd5U7sRAMkXQuoU4-KA6IUsVqDEF90zStn8K9yWleWcf6Nlev-pIs8LqXTolJdu-XWObZaba1Lmf6OOdnMjeGlMO802n_Yh4tsmjyDwi1S70NbV8XZsgUs")
            center/cover no-repeat;
          display:flex;align-items:center;
        }
        .hero-text{color:#fff;padding:40px;max-width:500px}
        .hero-text h1{font-size:36px;margin-bottom:10px}
        .hero-text p{font-size:18px;margin-bottom:20px}
        .hero-text button{background:#135bec;border:none;color:#fff;padding:12px 30px;font-weight:700;cursor:pointer}

        /* SECTION */
        .section{background:#fff;padding:20px;border-radius:4px}
        .section-header h2{font-size:20px;margin-bottom:15px}

        /* PRODUCTS */
        .products{display:flex;gap:15px;overflow-x:auto}
        .product{min-width:200px;border:1px solid #eee;padding:15px;text-align:center}
        .product img{height:150px;object-fit:contain;margin-bottom:10px}
        .product h4{font-size:14px;margin-bottom:5px}
        .price{color:green;font-weight:700;font-size:14px}
        .sub{font-size:12px;color:#777}

        /* FOOTER */
        footer{background:#111;color:#aaa;margin-top:40px}
        .footer-bottom{border-top:1px solid #333;padding:20px;text-align:center;font-size:12px}

        /* FAB */
        .fab{position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;background:#135bec;color:#fff;display:flex;align-items:center;justify-content:center}
      `}</style>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <h1>Grand Summer Sale</h1>
            <p>Up to 80% Off on Top Global Brands</p>
            <button>SHOP NOW</button>
          </div>
        </section>

        {/* BEST DEALS */}
        <section className="section">
          <div className="section-header">
            <h2>Best Deals of the Day</h2>
          </div>

          <div className="products">
            {products
              .filter(p => p.discount < 15)
              .map((p, i) => (
                <div className="product" key={i}>
                  <img src={p.images[0]} alt={p.name} />
                  <h4>{p.name}</h4>
                  <div className="price">₹{p.price}</div>
                  <div className="sub">{p.brand}</div>
                </div>
              ))}
          </div>
        </section>

        {/* CATEGORY SECTIONS */}
        <CategorySections products={products} />

        {/* RECOMMENDED */}
        <section className="section">
          <div className="section-header">
            <h2>Recommended</h2>
          </div>

          <div className="products">
            {products.map((p, i) => (
              <div className="product" key={i}>
                <img src={p.images[0]} alt={p.name} />
                <h4>{p.name}</h4>
                <div className="price">₹{p.price}</div>
                <div className="sub">{p.brand}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-bottom">© 2024 FlipMart.com</div>
      </footer>
    </>
  );
}
/* =======================
   PRODUCTS
======================= */

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const searchWrapperRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      dispatch(productSlice.actions.clearFilter());
      setShowDropdown(false);
    } else {
      dispatch(productSlice.actions.filterProducts(value));
      setShowDropdown(true);
    }
  };

  // Filtered names for search dropdown
  const searchResults = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown if clicked outside or scrolled
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    const handleScroll = () => {
      setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="products-page">
      <h2 className="products-title">Best Electronics for You</h2>

      {/* SEARCH BAR */}
      <div
        className="search-wrapper"
        style={{ position: "relative" }}
        ref={searchWrapperRef}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

        {/* Search dropdown */}
        {showDropdown && searchTerm && searchResults.length > 0 && (
          <div
            className="search-dropdown"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {searchResults.map((p) => (
              <div
                key={p.id}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onClick={() => {
                  setSelectedProduct(p); // show modal
                  setSearchTerm("");     // clear search input
                  setShowDropdown(false); // hide dropdown
                  dispatch(productSlice.actions.clearFilter()); // reset filtered list
                }}
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCTS GRID */}
      <div className="product-grid" style={{ marginTop: "20px" }}>
        {products.length === 0 && <p>No products found.</p>}
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={p.images[0]} alt={p.name} className="product-image" />
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

              <p className="rating">⭐ {p.rating} ({p.reviewsCount})</p>

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

                <h4>Variants:</h4>
                <ul>
                  {selectedProduct.variants.map((v, i) => (
                    <li key={i}>
                      {v.color} | {v.ram} | {v.storage} - ₹
                      {v.price.toLocaleString()} {v.stock ? "" : "(Out of Stock)"}
                    </li>
                  ))}
                </ul>

                <h4>Offers:</h4>
                <ul>
                  {selectedProduct.offers.map((o, i) => (
                    <li key={i}>{o.type}: {o.description}</li>
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
    </div>
  );
}
/* =======================
   CART
======================= */

function Cart() {
  const { items, orderConfirmed } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const styles = {
    page: {
      padding: "30px 20px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    h2: { textAlign: "center", marginBottom: "25px", color: "#222", fontSize: "28px" },
    cartItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "12px",
      background: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    cartItemHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    },
    cartItemLeft: { display: "flex", alignItems: "center", gap: "15px" },
    cartItemImg: {
      width: "90px",
      height: "90px",
      objectFit: "cover",
      borderRadius: "10px",
      border: "1px solid #eee",
    },
    quantityControls: { display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" },
    btn: {
      padding: "8px 18px",
      background: "linear-gradient(90deg, #007bff, #0056d2)",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    btnHover: { transform: "scale(1.05)", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" },
    removeBtn: {
      padding: "6px 12px",
      width:"250px",
      background: "#ff4d4f",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    removeBtnHover: { transform: "scale(1.05)", boxShadow: "0 3px 8px rgba(0,0,0,0.2)" },
    clearBtn: {
      padding: "8px 18px",
      background: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "10px",
      transition: "all 0.2s ease",
    },
    cartFooter: { marginTop: "25px", textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px" },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease",
    },
    modal: {
      background: "#fff",
      padding: "35px 25px",
      borderRadius: "12px",
      maxWidth: "500px",
      width: "100%",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      transform: "translateY(0)",
      animation: "slideIn 0.3s ease",
    },
    checkoutModal: {
      background: "#fff",
      padding: "35px 25px",
      borderRadius: "12px",
      maxWidth: "500px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    },
    checkoutHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
    steps: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
    step: { flex: 1, textAlign: "center", padding: "6px 0", borderBottom: "3px solid #ddd", color: "#777", fontWeight: "500" },
    activeStep: { borderBottom: "3px solid #007bff", fontWeight: "600", color: "#007bff" },
    paymentCard: {
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      cursor: "pointer",
      marginBottom: "12px",
      transition: "all 0.2s ease",
    },
    selectedPayment: { borderColor: "#007bff", background: "#e6f0ff" },
    actions: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
    textarea: {
      width: "100%",
      minHeight: "80px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      resize: "none",
      transition: "all 0.2s ease",
    },
  };

  // helper for hover effect
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div style={styles.page}>
      <h2 style={styles.h2}>Your Cart</h2>

      {items.length === 0 && <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty 🛒</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.cartItem,
            ...(hoveredItem === item.id ? styles.cartItemHover : {}),
          }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div style={styles.cartItemLeft}>
            <img src={item.images?.[0]} alt={item.name} style={styles.cartItemImg} />
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: "5px 0" }}>₹{item.price.toLocaleString()}</p>
              <div style={styles.quantityControls}>
                <button
                  style={styles.btn}
                  onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "dec" }))}
                >
                  -
                </button>
                <span style={{ fontWeight: "600", minWidth: "25px", textAlign: "center" }}>{item.quantity}</span>
                <button
                  style={styles.btn}
                  onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "inc" }))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            style={styles.removeBtn}
            onClick={() => dispatch(cartSlice.actions.removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <div style={styles.cartFooter}>
          <button style={styles.clearBtn} onClick={() => dispatch(cartSlice.actions.clearCart())}>
            Clear Cart
          </button>
          <h3 style={{ margin: 0 }}>Total: ₹{total.toLocaleString()}</h3>
          <button
            style={styles.btn}
            onClick={() => {
              if (!user) navigate("/login");
              else setShowCheckout(true);
            }}
          >
            Place Order
          </button>
        </div>
      )}

      {/* ✅ ORDER SUCCESS */}
      {orderConfirmed && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>🎉 Order Placed Successfully</h2>
            <p>Thank you for shopping with us.</p>
            <button style={styles.btn} onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* 🚀 CHECKOUT MODAL */}
      {showCheckout && (
        <div style={styles.modalOverlay}>
          <div style={styles.checkoutModal}>
            <div style={styles.checkoutHeader}>
              <h3>Checkout</h3>
              {/* <button onClick={() => setShowCheckout(false)}>✕</button> */}
              <button
  onClick={() => setShowCheckout(false)}
  style={{
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "#0e0c0c",
    color: "#f8f2f2",
    width: "28px",
    height: "28px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    lineHeight: 1,
  }}
>
  ✕
</button>

            </div>

            <div style={styles.steps}>
              <span style={{ ...styles.step, ...(step === 1 ? styles.activeStep : {}) }}>Address</span>
              <span style={{ ...styles.step, ...(step === 2 ? styles.activeStep : {}) }}>Payment</span>
              <span style={{ ...styles.step, ...(step === 3 ? styles.activeStep : {}) }}>Confirm</span>
            </div>

            {step === 1 && (
              <div>
                <textarea
                  style={styles.textarea}
                  placeholder="House no, Street, City, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button style={styles.btn} disabled={!address} onClick={() => setStep(2)}>
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                {["cod", "upi", "card"].map((method) => (
                  <div
                    key={method}
                    style={{
                      ...styles.paymentCard,
                      ...(paymentMethod === method ? styles.selectedPayment : {}),
                    }}
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method.toUpperCase()}
                  </div>
                ))}
                <div style={styles.actions}>
                  <button onClick={() => setStep(1)}>Back</button>
                  <button style={styles.btn} onClick={() => setStep(3)}>Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Payment:</strong> {paymentMethod}</p>
                <p className="total">₹{total.toLocaleString()}</p>
                <div style={styles.actions}>
                  <button onClick={() => setStep(2)}>Back</button>
                  <button
                    style={styles.btn}
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
    </div>
  );
}
/* =======================
   orders
======================= */
function Orders() {
  const orders = useSelector((state) => state.orders.list);
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 && (
        <p>No orders yet 📦</p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="order-card"
          onClick={() => setSelectedOrder(order)}
        >
          <div className="order-left">
            <img src={order.items[0].images?.[0]} alt="" />
          </div>

          <div className="order-middle">
            <h4>Order #{order.id}</h4>
            <p>{order.items.length} item(s)</p>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          <div className="order-right">
            <p className="price">₹{order.total.toLocaleString()}</p>
            <span className="date">{order.date}</span>
          </div>
        </div>
      ))}

      {/* 🔍 ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal order-details">
            <h3>Order #{selectedOrder.id}</h3>

            {selectedOrder.items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.images?.[0]} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <small>Qty: {item.quantity}</small>
                </div>
                <span>₹{item.price}</span>
              </div>
            ))}

            <hr />

            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Payment:</strong> {selectedOrder.payment}</p>
            <p className="total">
              ₹{selectedOrder.total.toLocaleString()}
            </p>

            <button
              className="btn primary"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🎨 STYLES */}
      <style>{`
        .orders-page {
          max-width: 900px;
          margin: auto;
          padding: 20px;
        }

        .order-card {
          display: flex;
          gap: 16px;
          background: #fff;
          padding: 16px;
          border-radius: 14px;
          margin-bottom: 14px;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0,0,0,.06);
          transition: transform .2s;
        }

        .order-card:hover {
          transform: translateY(-3px);
        }

        .order-left img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
        }

        .order-middle {
          flex: 1;
        }

        .order-middle h4 {
          margin: 0;
        }

        .status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          margin-top: 6px;
        }

        .status.placed { background: #e0f2ff; color: #0369a1; }
        .status.delivered { background: #dcfce7; color: #166534; }
        .status.cancelled { background: #fee2e2; color: #991b1b; }

        .order-right {
          text-align: right;
        }

        .price {
          font-weight: 700;
        }

        .date {
          font-size: 12px;
          color: #777;
        }

        .order-details {
          width: 420px;
        }

        .order-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
        }

        .order-item img {
          width: 50px;
          height: 50px;
          border-radius: 8px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1200;
        }

        .modal {
          background: #fff;
          padding: 20px;
          border-radius: 16px;
          animation: pop .3s ease;
        }

        @keyframes pop {
          from { transform: scale(.85); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
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
          <Route
          path="/myorder"
          element={
            user ? <Orders /> : <Navigate to="/" replace />
          }
        />
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