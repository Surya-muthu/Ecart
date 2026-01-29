import React, { useEffect, useReducer, useRef, useState } from "react";
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
import ProductCategoryDisplay from "./ProductCategoryDisplay";




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


/* =======================
   REDUX – CART
======================= */
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
// ======= Redux Slices =======

// ======= Cart Slice =======
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: savedCart, orderConfirmed: false },
  reducers: {
    addToCart(state, action) {
      state.orderConfirmed = false;
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    changeQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload.id);
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
    resetOrder(state) {
      state.orderConfirmed = false;
    },
  },
});

// ======= Orders Slice =======
const initialOrders = [];
const statusSteps = ["Booked", "Processing", "Shipped", "Delivered"];
const orderSlice = createSlice({
  name: "orders",
  initialState: initialOrders,
  reducers: {
    addOrder: (state, action) => {
      const { items, paymentMethod } = action.payload;
      state.push({
        id: "ORD" + Math.floor(Math.random() * 10000),
        date: new Date().toISOString().split("T")[0],
        status: "Booked",
        items,
        paymentMethod,
      });
    },
    updateStatus: (state, action) => {
      const order = state.find(o => o.id === action.payload.id);
      if (order) {
        const currentIndex = statusSteps.indexOf(order.status);
        const nextIndex = Math.min(currentIndex + 1, statusSteps.length - 1);
        order.status = statusSteps[nextIndex];
      }
    },
  },
});

// ======= product Slice =======
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
   STORE
======================= */
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    orders: orderSlice.reducer,
  },
});
/* =======================
   NAVBAR
======================= */

function Navbar() {
  const orders = useSelector((state) => state.orders); // select all orders
  const ordersCount = orders.length || 0;
  const user = useSelector((state) => state.user.currentUser);
  const cartCount = useSelector((state) => state.cart.items.length || 0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = React.useState(false);
  const [showName, setShowName] = React.useState(false);

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
    navigate("/login");
  };

  const navbarStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#0a218b",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
  };

  const navLeft = {
    display: "flex",
    alignItems: "center",
  };

  const navRight = {
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "20px",
    fontWeight: 500,
  };

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    // backgroundColor: "#ffd700",
    background: "linear-gradient(145deg, #3611a6, #f7e86f)",
    color: "#d3d9f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "18px",
    cursor: "pointer",
  };

  const tooltipStyle = {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "#000",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    whiteSpace: "nowrap",
  };

  const popupStyle = {
    position: "absolute",
    top: "55px",
    right: "0",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "8px",
    width: "180px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    padding: "10px",
    zIndex: 2000,
  };

  const popupItem = {
    padding: "8px 10px",
    cursor: "pointer",
    borderRadius: "6px",
  };

  React.useEffect(() => {
    document.body.style.paddingTop = "70px";
    return () => (document.body.style.paddingTop = "0px");
  }, []);

  React.useEffect(() => {
    const close = () => setShowPopup(false);
    if (showPopup) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showPopup]);

  return (
    <nav style={navbarStyles}>
      {/* LEFT SIDE */}
      <div style={navLeft}>
        <Link to="/" style={{ ...linkStyle, fontSize: "20px", fontWeight: "700" }}>
          FlipMart
        </Link>

        {user && (
          <>
            <Link to="/products" style={linkStyle}>
              Products
            </Link>
            <Link to="/product" style={linkStyle}>
              Catogaries
            </Link>
            {cartCount > 0 && (
            <Link to="/cart" style={linkStyle}>
                  Cart ({cartCount})
            </Link>
            )}
               {ordersCount > 0 && (
            <Link to="/myorder" style={linkStyle}>
                  myOrders ({ordersCount})
            </Link>
            )}

        

          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={navRight} onClick={(e) => e.stopPropagation()}>
        {user && (
          <>
            {/* AVATAR */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setShowName(true)}
              onMouseLeave={() => setShowName(false)}
              onClick={() => setShowPopup(!showPopup)}
            >
              <div style={avatarStyle}>
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(145deg, #3611a6, #f7e86f)",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>

              {showName && <div style={tooltipStyle}>{user.username}</div>}
            </div>

            {/* POPUP */}
            {showPopup && (
              <div style={popupStyle}>
                <div style={popupItem} onClick={() => navigate("/products")}>
                  🛍 Products
                </div>
                <div style={popupItem} onClick={() => navigate("/cart")}>
                  🛒 Cart {cartCount > 0 ? `(${cartCount})` : ""}
                </div>
                <div style={popupItem} onClick={() => navigate("/profile")}>
                  👤 Profile
                </div>
               <div style={popupItem} onClick={() => navigate("/myorder")}>
                🛒 My Orders {ordersCount > 0 ? `(${ordersCount})` : ""}
              </div>

                <hr />
                <div
                  style={{ ...popupItem, color: "red" }}
                  onClick={handleLogout}
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

/* =======================
   Login
======================= */

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
/* =======================
   Register
======================= */
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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(PRODUCTS); // your product data
  }, []);

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
            .filter(p => p.category && Object.keys(cat.filter).every(level => p.category[level] === cat.filter[level]))
            .map((p, i) => (
              <div
                className="product"
                key={i}
                onClick={() => setSelectedProduct(p)}
              >
                <div className="product-img-wrapper">
                  <img src={p.images[0]} alt={p.name} />
                </div>
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
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Inter,sans-serif;background:#f1f3f6;color:#0d121b;transition:0.3s}
        main{max-width:1280px;margin:auto;padding:20px;display:flex;flex-direction:column;gap:30px}

        .hero{
          height:400px;border-radius:12px;
          background:
            linear-gradient(to right, rgba(0,0,0,0.6), transparent),
            url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIaxtUa_uLHLhnUF9ztYjDdNDdXfC8a8e7y0DrN3qsNmq98T1jOZhISldyVT1HT-15zAef2OmEMxKuOEnhj5aVgMbNG3NNpsoNcxnlRa2boB03308DAjmYVWo68ZKZK02ZIyOUjiePLlbKMsFsNfhfsyd5U7sRAMkXQuoU4-KA6IUsVqDEF90zStn8K9yWleWcf6Nlev-pIs8LqXTolJdu-XWObZaba1Lmf6OOdnMjeGlMO802n_Yh4tsmjyDwi1S70NbV8XZsgUs") center/cover no-repeat;
          display:flex;align-items:center;padding-left:50px;box-shadow:0 10px 30px rgba(0,0,0,0.3);
          overflow:hidden;position:relative;
        }
        .hero::after{
          content:"";position:absolute;inset:0;background:linear-gradient(120deg, #135bec33, #f5429233);mix-blend-mode:overlay;
        }
        .hero-text{color:#fff;position:relative;z-index:1;max-width:500px}
        .hero-text h1{font-size:42px;margin-bottom:15px;text-shadow:1px 1px 8px rgba(0,0,0,0.6)}
        .hero-text p{font-size:20px;margin-bottom:20px;text-shadow:1px 1px 6px rgba(0,0,0,0.5)}
        .hero-text button{
          background:linear-gradient(135deg,#135bec,#42a1f5);
          border:none;color:#fff;padding:15px 35px;font-weight:700;font-size:16px;border-radius:8px;
          cursor:pointer;transition:0.3s;box-shadow:0 5px 15px rgba(0,0,0,0.3);
        }
        .hero-text button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.4)}

        .section{background:#fff;padding:25px;border-radius:12px;box-shadow:0 8px 20px rgba(0,0,0,0.05)}
        .section-header h2{font-size:22px;margin-bottom:20px;color:#135bec}

        .products{display:flex;gap:20px;overflow-x:auto;padding-bottom:10px}
        .product{
          min-width:220px;border-radius:12px;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);
          padding:15px;text-align:center;flex-shrink:0;transition:0.3s;cursor:pointer;box-shadow:0 5px 20px rgba(0,0,0,0.1);
        }
        .product:hover{transform:translateY(-5px);box-shadow:0 10px 25px rgba(0,0,0,0.15)}

        .product-img-wrapper{
          width:100%;height:180px;overflow:hidden;border-radius:12px;margin-bottom:10px;
          display:flex;align-items:center;justify-content:center;background:#f9f9f9;
        }
        .product img{height:100%;object-fit:contain;transition:0.3s}
        .product:hover img{transform:scale(1.05)}

        .product h4{font-size:15px;margin-bottom:6px;color:#0d121b;font-weight:600}
        .price{color:#2ecc71;font-weight:700;font-size:15px;margin-bottom:3px}
        .sub{font-size:13px;color:#555}

        footer{background:#111;color:#aaa;margin-top:50px;padding:30px;border-radius:12px}
        .footer-bottom{text-align:center;font-size:13px}

        .modal-overlay{
          position:fixed;inset:0;background:rgba(0,0,0,0.7);
          display:flex;align-items:center;justify-content:center;z-index:200;overflow-y:auto;padding:20px;
          animation:fadeIn 0.3s;
        }
        .modal-box{
          background:#fff;border-radius:12px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;
          position:relative;padding:25px;box-shadow:0 15px 40px rgba(0,0,0,0.2);
        }
        .modal-close{
          position:absolute;top:15px;right:15px;background:#f1f1f1;border:none;border-radius:50%;width:36px;height:36px;
          cursor:pointer;font-size:20px;font-weight:bold;transition:0.3s;
        }
        .modal-close:hover{background:#ddd;transform:scale(1.1)}

        .modal-content{display:flex;gap:25px;flex-wrap:wrap}
        .modal-images{flex:1 1 350px;display:flex;flex-direction:column;gap:15px}
        .modal-images img{width:100%;height:250px;object-fit:contain;border-radius:12px;background:#fafafa;transition:0.3s}
        .modal-images img:hover{transform:scale(1.02)}

        .modal-info{flex:1 1 400px;display:flex;flex-direction:column;gap:12px}
        .modal-info h2{margin:0;font-size:24px;color:#135bec}
        .modal-info .modal-price{font-size:22px;font-weight:700;color:#2ecc71}
        .modal-info ul{padding-left:20px;margin-bottom:12px;list-style:circle;color:#333}
        .btn-primary{
          background:linear-gradient(135deg,#135bec,#42a1f5);border:none;color:#fff;padding:12px 25px;
          border-radius:8px;font-weight:700;cursor:pointer;transition:0.3s;align-self:flex-start;
        }
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(0,0,0,0.3)}

        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>Grand Summer Sale</h1>
            <p>Up to 80% Off on Top Global Brands</p>
            <button>SHOP NOW</button>
          </div>
        </section>

        <CategorySections products={products} />
      </main>

      <footer>
        <div className="footer-bottom">© 2026 FlipMart.com</div>
      </footer>

      {selectedProduct && (
        <div className="modal-overlay"  onClick={() => setSelectedProduct(null)}>
          <div className="modal-box" style={{ top: "45px" }}  onClick={(e) => e.stopPropagation()}>
            <button
  style={{
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    width: "36px",
    height: "36px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
    fontSize: "18px",
  }}
  onMouseEnter={(e) => Object.assign(e.target.style, { background: "rgba(255, 0, 0, 0.8)", transform: "scale(1.1)" })}
  onMouseLeave={(e) => Object.assign(e.target.style, { background: "rgba(0,0,0,0.6)", transform: "scale(1)" })}
  onClick={() => setSelectedProduct(null)}
>
  ✕
</button>

            <div className="modal-content">
              <div className="modal-images">
                {selectedProduct.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${selectedProduct.name} ${idx}`} />
                ))}
              </div>
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-price">₹{selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
                <ul>
                  {selectedProduct.highlights?.map((h, i) => <li key={i}>✔ {h}</li>)}
                </ul>
                <ul>
                  {selectedProduct.variants?.map((v, i) => (
                    <li key={i}>{v.color} | {v.ram} | {v.storage} - ₹{v.price} {v.stock ? "" : "(Out of Stock)"}</li>
                  ))}
                </ul>
                <ul>
                  {selectedProduct.offers?.map((o, i) => <li key={i}>{o.type}: {o.description}</li>)}
                </ul>
                <button
                  className="btn-primary"
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
    </>
  );
}
/* =======================
   PRODUCTS
// ======================= */
function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchWrapperRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const searchResults = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    const handleScroll = () => setShowDropdown(false);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: "20px 40px" }}>
      <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "25px", textAlign: "center", color: "#111" }}>
        Best Electronics for You
      </h2>

      {/* SEARCH */}
      <div style={{ position: "relative", marginBottom: "30px", maxWidth: "600px", margin: "0 auto" }} ref={searchWrapperRef}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            outline: "none",
            transition: "all 0.2s ease",
          }}
        />
        {showDropdown && searchTerm && searchResults.length > 0 && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 100,
          }}>
            {searchResults.map((p) => (
              <div
                key={p.id}
                style={{ padding: "12px 18px", cursor: "pointer", borderBottom: "1px solid #eee" }}
                onClick={() => {
                  setSelectedProduct(p);
                  setSearchTerm("");
                  setShowDropdown(false);
                  dispatch(productSlice.actions.clearFilter());
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f0f4ff"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCTS GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "25px",
      }}>
        {products.length === 0 && <p>No products found.</p>}
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: hoveredCard === p.id ? "0 15px 35px rgba(0,0,0,0.15)" : "0 10px 25px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              transform: hoveredCard === p.id ? "translateY(-5px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHoveredCard(p.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setSelectedProduct(p)}
          >
            <div style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f8", padding: "15px" }}>
              <img src={p.images[0]} alt={p.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: "12px" }} />
            </div>
            <div style={{ padding: "18px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "6px", color: "#111" }}>{p.name}</h3>
              <p style={{ fontSize: "14px", color: "#777", marginBottom: "10px" }}>{p.brand}</p>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", gap: "8px" }}>
                <span style={{ fontWeight: 700, fontSize: "16px", color: "#2e7d32" }}>₹{p.price.toLocaleString()}</span>
                {p.originalPrice && <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "14px" }}>₹{p.originalPrice.toLocaleString()}</span>}
                {p.discount && <span style={{ color: "#ff5722", background: "#ff5722", padding: "2px 6px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: "#fff" }}>{p.discount}% OFF</span>}
              </div>
              {p.rating && <p style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>⭐ {p.rating} ({p.reviewsCount})</p>}
              <button
                style={{
                  padding: "10px 15px",
                  background: "linear-gradient(90deg, #135bec, #0b3dca)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  marginTop: "auto",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => Object.assign(e.target.style, { transform: "scale(1.05)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" })}
                onMouseLeave={(e) => Object.assign(e.target.style, { transform: "scale(1)", boxShadow: "none" })}
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
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            overflowY: "auto",
            padding: "20px",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              marginTop:"100px",
           
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              padding: "25px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
  <button
  style={{
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    width: "36px",
    height: "36px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
    fontSize: "18px",
  }}
  onMouseEnter={(e) => Object.assign(e.target.style, { background: "rgba(255, 0, 0, 0.8)", transform: "scale(1.1)" })}
  onMouseLeave={(e) => Object.assign(e.target.style, { background: "rgba(0,0,0,0.6)", transform: "scale(1)" })}
  onClick={() => setSelectedProduct(null)}
>
  ✕
</button>

       

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {selectedProduct.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${selectedProduct.name} ${idx}`} style={{ width: "100%", height: "220px", objectFit: "contain", borderRadius: "12px", background: "#fafafa" }} />
                ))}
              </div>

              <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h2 style={{ fontSize: "26px", fontWeight: 700 }}>{selectedProduct.name}</h2>
                <p style={{ fontSize: "22px", fontWeight: 700, color: "#2e7d32" }}>₹{selectedProduct.price.toLocaleString()}</p>
                <p style={{ color: "#555", fontSize: "16px" }}>{selectedProduct.description}</p>

                {selectedProduct.highlights && <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
                  {selectedProduct.highlights.map((h, i) => <li key={i}>✔ {h}</li>)}
                </ul>}

                {selectedProduct.variants && <>
                  <h4>Variants:</h4>
                  <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
                    {selectedProduct.variants.map((v, i) => (
                      <li key={i}>{v.color} | {v.ram} | {v.storage} - ₹{v.price.toLocaleString()} {!v.stock && "(Out of Stock)"}</li>
                    ))}
                  </ul>
                </>}

                {selectedProduct.offers && <>
                  <h4>Offers:</h4>
                  <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
                    {selectedProduct.offers.map((o, i) => <li key={i}>{o.type}: {o.description}</li>)}
                  </ul>
                </>}

                <button
                  style={{
                    padding: "12px 25px",
                    background: "linear-gradient(135deg,#135bec,#42a1f5)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "0.3s",
                    alignSelf: "flex-start",
                  }}
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

// ======= Checkout Modal =======

function AddressStep({ address, setAddress, useOldAddress, setUseOldAddress, setStep }) {
  const oldAddress = "123, Main Street, Demo City, 110011";

  const handleAddressChange = (val) => {
    setAddress(val);
  };

  const styles = {
    container: { display: "flex", flexDirection: "column", gap: "20px" },
    addressCards: { display: "flex", gap: "15px" },
    card: (active) => ({
      flex: 1,
      padding: "20px",
      borderRadius: "12px",
      border: `2px solid ${active ? "#007bff" : "#ddd"}`,
      background: active ? "#e6f0ff" : "#f9f9f9",
      cursor: "pointer",
      boxShadow: active ? "0 6px 18px rgba(0,123,255,0.2)" : "0 3px 10px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "100px",
    }),
    cardTitle: { fontWeight: 600, marginBottom: "8px", fontSize: "15px" },
    cardText: { fontSize: "14px", color: "#555" },
    textarea: { width: "100%", minHeight: "100px", padding: "15px", borderRadius: "12px", border: "1px solid #ccc", fontSize: "15px", resize: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
    btn: { padding: "12px 20px", background: "linear-gradient(90deg, #007bff, #0056d2)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: 600, fontSize: "15px", transition: "all 0.2s ease" },
    btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.addressCards}>
        {/* OLD ADDRESS CARD */}
        <div
          style={styles.card(useOldAddress)}
          onClick={() => { setUseOldAddress(true); handleAddressChange(oldAddress); }}
        >
          <div style={styles.cardTitle}>Use Old Address</div>
          <div style={styles.cardText}>{oldAddress}</div>
        </div>

        {/* NEW ADDRESS CARD */}
        <div
          style={styles.card(!useOldAddress)}
          onClick={() => { setUseOldAddress(false); handleAddressChange(""); }}
        >
          <div style={styles.cardTitle}>Add New Address</div>
          <div style={styles.cardText}>Enter a new shipping address</div>
        </div>
      </div>

      {/* NEW ADDRESS TEXTAREA */}
      {!useOldAddress && (
        <textarea
          style={styles.textarea}
          placeholder="House no, Street, City, Pincode"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
        />
      )}

      {/* CONTINUE BUTTON */}
      <button
        style={{ ...styles.btn, ...( (!address || address.length < 5) && styles.btnDisabled ) }}
        disabled={!address || address.length < 5}
        onClick={() => setStep(2)}
      >
        Continue
      </button>
    </div>
  );
}

function PaymentStep({ paymentMethod, setPaymentMethod, onBack, onContinue }) {
  const [cardDetails, setCardDetails] = React.useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const styles = {
    container: { display: "flex", flexDirection: "column", gap: "20px" },
    paymentCard: (active) => ({
      padding: "18px 20px",
      borderRadius: "12px",
      border: `2px solid ${active ? "#007bff" : "#ddd"}`,
      background: active ? "#e6f0ff" : "#f9f9f9",
      cursor: "pointer",
      boxShadow: active ? "0 6px 18px rgba(0,123,255,0.2)" : "0 3px 10px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.3s ease",
      fontWeight: 500,
      fontSize: "15px",
    }),
    inputContainer: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px", transition: "all 0.3s ease" },
    input: { padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", width: "100%" },
    errorText: { color: "red", fontSize: "12px" },
    btn: { padding: "12px 20px", background: "linear-gradient(90deg, #007bff, #0056d2)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: 600, fontSize: "15px", transition: "all 0.2s ease" },
    btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
    backBtn: { padding: "12px 20px", border: "1px solid #ccc", borderRadius: "12px", cursor: "pointer", background: "#f8f8f8", color: "#333", fontWeight: 500, fontSize: "15px" },
  };

  const validateCard = () => {
    const errs = {};
    if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ""))) errs.number = "Card number must be 16 digits";
    if (!cardDetails.name) errs.name = "Cardholder name required";
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) errs.expiry = "Expiry must be MM/YY";
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) errs.cvv = "CVV must be 3 or 4 digits";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateUpi = () => {
    if (!upiId.includes("@")) {
      setErrors({ upi: "Invalid UPI ID" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleContinue = () => {
    if (paymentMethod === "card" && !validateCard()) return;
    if (paymentMethod === "upi" && !validateUpi()) return;

    if (paymentMethod === "card") console.log("Card details saved:", cardDetails);
    if (paymentMethod === "upi") console.log("UPI ID saved:", upiId);

    onContinue();
  };

  return (
    <div style={styles.container}>
      {["cod", "upi", "card"].map((method) => (
        <div key={method} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={styles.paymentCard(paymentMethod === method)}
            onClick={() => setPaymentMethod(method)}
          >
            {method.toUpperCase()} {paymentMethod === method && "✓"}
          </div>

          {/* Show UPI input directly below UPI card */}
          {method === "upi" && paymentMethod === "upi" && (
            <div style={styles.inputContainer}>
              <input
                style={styles.input}
                placeholder="Enter UPI ID (e.g., user@bank)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              {errors.upi && <span style={styles.errorText}>{errors.upi}</span>}
            </div>
          )}

          {/* Show Card form directly below Card option */}
          {method === "card" && paymentMethod === "card" && (
            <div style={styles.inputContainer}>
              <input
                style={styles.input}
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              {errors.number && <span style={styles.errorText}>{errors.number}</span>}

              <input
                style={styles.input}
                placeholder="Cardholder Name"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}

              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                <input
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
              {(errors.expiry || errors.cvv) && (
                <span style={styles.errorText}>{errors.expiry || errors.cvv}</span>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Navigation buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button style={styles.backBtn} onClick={onBack}>Back</button>
        <button
          style={{ ...styles.btn, ...(!paymentMethod && styles.btnDisabled) }}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}



function ConfirmStep({ address, paymentMethod, total, onBack, onContinue }) {
  const styles = {
    container: { display: "flex", flexDirection: "column", gap: "25px", fontFamily: "Arial, sans-serif" },
    card: { padding: "20px", borderRadius: "16px", background: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "12px", transition: "all 0.3s ease" },
    header: { fontSize: "18px", fontWeight: 600, marginBottom: "10px", color: "#007bff" },
    row: { display: "flex", justifyContent: "space-between", fontSize: "15px", color: "#333" },
    totalRow: { display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 600, marginTop: "10px", borderTop: "1px solid #eee", paddingTop: "10px" },
    btnContainer: { display: "flex", justifyContent: "space-between", marginTop: "20px" },
    btn: { padding: "12px 22px", background: "linear-gradient(90deg, #007bff, #0056d2)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: 600, fontSize: "15px", transition: "all 0.2s ease" },
    backBtn: { padding: "12px 22px", border: "1px solid #ccc", borderRadius: "12px", cursor: "pointer", background: "#f8f8f8", color: "#333", fontWeight: 500, fontSize: "15px" },
  };

  // For nicer payment display
  const paymentLabel = {
    cod: "Cash on Delivery",
    upi: "UPI Payment",
    card: "Credit/Debit Card",
  }[paymentMethod] || paymentMethod.toUpperCase();

  return (
    <div style={styles.container}>
      {/* Address Card */}
      <div style={styles.card}>
        <div style={styles.header}>Delivery Address</div>
        <div style={{ fontSize: "14px", color: "#555" }}>{address}</div>
      </div>

      {/* Payment Card */}
      <div style={styles.card}>
        <div style={styles.header}>Payment Method</div>
        <div style={{ fontSize: "14px", color: "#555" }}>{paymentLabel}</div>
      </div>

      {/* Total Summary */}
      <div style={styles.card}>
        <div style={styles.row}>
          <span>Subtotal:</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <div style={styles.totalRow}>
          <span>Total:</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={styles.btnContainer}>
        <button style={styles.backBtn} onClick={onBack}>Back</button>
        <button style={styles.btn} onClick={onContinue}>Pay Now</button>
      </div>
    </div>
  );
}


// CHECKOUT MODAL
function CheckoutModal({ step, setStep, address, setAddress, paymentMethod, setPaymentMethod, total, onClose, onContinue }) {
  const [useOldAddress, setUseOldAddress] = React.useState(true);

  const styles = {
    modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "15px", overflowY: "auto" },
    modal: { background: "#fff", borderRadius: "16px", maxWidth: "500px", width: "100%", padding: "30px 25px", display: "flex", flexDirection: "column", gap: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", position: "relative" },
    closeBtn: { position: "absolute", top: "20px", right: "20px", border: "none", borderRadius: "50%", width: "36px", height: "36px", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
    steps: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
    step: { flex: 1, textAlign: "center", padding: "6px 0", borderBottom: "3px solid #ddd", color: "#777", fontWeight: 500 },
    activeStep: { borderBottom: "3px solid #007bff", color: "#007bff", fontWeight: 600 },
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        <div style={styles.steps}>
          <span style={{ ...styles.step, ...(step === 1 ? styles.activeStep : {}) }}>Address</span>
          <span style={{ ...styles.step, ...(step === 2 ? styles.activeStep : {}) }}>Payment</span>
          <span style={{ ...styles.step, ...(step === 3 ? styles.activeStep : {}) }}>Confirm</span>
        </div>

        {step === 1 && (
          <AddressStep
            address={address}
            setAddress={setAddress}
            useOldAddress={useOldAddress}
            setUseOldAddress={setUseOldAddress}
            setStep={setStep}  // ✅ Pass setStep
          />
        )}

        {step === 2 && (
          <PaymentStep
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <ConfirmStep
            address={address}
            paymentMethod={paymentMethod}
            total={total}
            onBack={() => setStep(2)}
            onContinue={onContinue}
          />
        )}
      </div>
    </div>
  );
}

// ======= Cart Component =======
function Cart() {
  const { items, orderConfirmed } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [address, setAddress] = React.useState("123, Main Street, Demo City, 110011");
  const [paymentMethod, setPaymentMethod] = React.useState("cod");
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!address || !paymentMethod || items.length === 0) return alert("Please complete checkout properly!");
    dispatch(orderSlice.actions.addOrder({ items, paymentMethod }));
    dispatch(cartSlice.actions.confirmOrder());
    setShowCheckout(false);
    setStep(1);
    setAddress("123, Main Street, Demo City, 110011");
    setPaymentMethod("cod");
    
  };

  const styles = {
    container: { padding: "30px 20px", maxWidth: "900px", margin: "0 auto" },
    heading: { textAlign: "center", marginBottom: "25px", fontSize: "28px", fontWeight: "600" },
    emptyText: { textAlign: "center", fontSize: "18px", color: "#777" },
    itemCard: (hover) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "12px",
      background: "#fff",
      boxShadow: hover ? "0 8px 20px rgba(0,0,0,0.12)" : "0 4px 12px rgba(0,0,0,0.08)",
      transition: "all 0.2s ease",
    }),
    itemInfo: { display: "flex", gap: "15px", alignItems: "center" },
    itemImg: { width: "90px", height: "90px", objectFit: "cover", borderRadius: "10px", border: "1px solid #eee" },
    itemName: { margin: 0, fontWeight: 500, fontSize: "18px" },
    itemPrice: { margin: "5px 0", color: "#555" },
    quantityControls: { display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" },
    qtyBtn: { padding: "6px 12px", borderRadius: "6px", border: "none", background: "#007bff", color: "#fff", cursor: "pointer", fontWeight: 500 },
    removeBtn: { padding: "6px 12px", background: "#ff4d4f", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" },
    bottomBar: { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px", marginTop: "25px" },
    clearBtn: { padding: "8px 18px", background: "#6c757d", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" },
    placeBtn: { padding: "10px 20px", background: "#007bff", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600 },
    orderModal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
    orderBox: { background: "#fff", padding: "35px 25px", borderRadius: "12px", textAlign: "center", width: "400px" },
    orderHeading: { fontSize: "24px", marginBottom: "20px" },
    continueBtn: { padding: "10px 18px", background: "#007bff", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Cart</h2>

      {items.length === 0 && <p style={styles.emptyText}>Your cart is empty 🛒</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={styles.itemCard(hoveredItem === item.id)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div style={styles.itemInfo}>
            {item.images?.[0] && <img src={item.images[0]} alt={item.name} style={styles.itemImg} />}
            <div>
              <h4 style={styles.itemName}>{item.name}</h4>
              <p style={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
              <div style={styles.quantityControls}>
                <button style={styles.qtyBtn} onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "dec" }))}>-</button>
                <span>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "inc" }))}>+</button>
              </div>
            </div>
          </div>
          <button style={styles.removeBtn} onClick={() => dispatch(cartSlice.actions.removeFromCart(item.id))}>Remove</button>
        </div>
      ))}

      {items.length > 0 && (
        <div style={styles.bottomBar}>
          <button style={styles.clearBtn} onClick={() => dispatch(cartSlice.actions.clearCart())}>Clear Cart</button>
          <h3>Total: ₹{total.toLocaleString()}</h3>
          <button style={styles.placeBtn} onClick={() => (!user ? navigate("/login") : setShowCheckout(true))}>Place Order</button>
        </div>
      )}

 

{orderConfirmed && (
  <div style={styles.orderModal}>
    <div style={styles.orderBox}>
      <h2 style={styles.orderHeading}>🎉 Order Placed Successfully</h2>
      <button
        style={styles.continueBtn}
        onClick={() => {
          dispatch(cartSlice.actions.resetOrder()); // reset cart
          navigate("/"); // redirect to orders page
        }}
      >
        Continue Shopping
      </button>
    </div>
  </div>
)}


      {showCheckout && (
        <CheckoutModal
          step={step}
          setStep={setStep}
          address={address}
          setAddress={setAddress}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          total={total}
          onClose={() => { setShowCheckout(false); setStep(1); }}
          onContinue={handleCheckout}
        />
      )}
    </div>
  );
}

function Profile() {
  const user = useSelector((state) => state.user.currentUser);

  // Hooks at top level
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState(
    user
      ? [
          { label: "Full Name", name: "fullName", value: user.username || "John Doe" },
          { label: "Email", name: "email", value: user.email || "john@example.com" },
          { label: "Phone", name: "phone", value: "+1 987 654 3210" },
          {
            label: "Address",
            name: "address",
            value: {
              line1: "221B Baker Street",
              line2: "Near Central Mall",
              city: "London",
              state: "London",
              zip: "NW1 6XE",
              country: "UK",
            },
          },
          { label: "Payment Method", name: "paymentMethod", value: "Visa •••• 4242" },
        ]
      : []
  );

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) =>
      prev.map((field) => {
        if (field.name === "address" && name.startsWith("address.")) {
          const key = name.split(".")[1];
          return { ...field, value: { ...field.value, [key]: value } };
        }
        if (field.name === name) return { ...field, value };
        return field;
      })
    );
  };

  const handleSave = () => {
    console.log("Saved data:", fields);
    setEditMode(false);
  };

  const getField = (name) => fields.find((f) => f.name === name)?.value;

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
  };

  const actionBtn = (bg) => ({
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "25px",
    border: "none",
    background: bg,
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        minHeight: "90vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          maxWidth: "1000px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            flex: "0 0 300px",
            background: "linear-gradient(145deg, #3611a6, #f7e86f)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 20px",
            color: "#ccd3f6",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "20px",
              border: "4px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: 700,
            }}
          >
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              getField("fullName").charAt(0).toUpperCase()
            )}
          </div>
          <h2 style={{ margin: "0 0 10px 0" }}>{getField("fullName")}</h2>
          <p style={{ color: "green", fontWeight: 600, marginBottom: "20px" }}>● Active</p>
          <button style={actionBtn("#1890ff")} onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ flex: 1, padding: "40px 30px" }}>
          <h2 style={{ marginBottom: "30px", fontSize: "28px", color: "#333" }}>
            {editMode ? "Edit Profile" : "Account Details"}
          </h2>

          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: "25px" }}>
              <p style={{ color: "#777", fontSize: "14px", marginBottom: "8px" }}>{field.label}</p>

              {field.name === "address" ? (
                editMode ? (
                  Object.keys(field.value).map((key) => (
                    <input
                      key={key}
                      type="text"
                      name={`address.${key}`}
                      value={field.value[key]}
                      onChange={handleChange}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      style={inputStyle}
                    />
                  ))
                ) : (
                  <p style={{ fontWeight: 600, color: "#333", lineHeight: "1.6" }}>
                    {field.value.line1}, {field.value.line2}
                    <br />
                    {field.value.city}, {field.value.state}
                    <br />
                    {field.value.zip}, {field.value.country}
                  </p>
                )
              ) : editMode ? (
                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  style={inputStyle}
                />
              ) : (
                <p style={{ fontWeight: 600, color: "#333" }}>{field.value}</p>
              )}
            </div>
          ))}

          {editMode && (
            <button style={actionBtn("#28a745")} onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =======================
   orders
======================= */

function Order() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const statusSteps = ["Booked", "Processing", "Shipped", "Delivered"];
  const { updateStatus } = orderSlice.actions; // action to update order status

  const styles = {
    page: {
      padding: "30px 20px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
      color: "#222",
    },
    orderCard: {
      borderRadius: "16px",
      padding: "25px",
      marginBottom: "25px",
      background: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    orderInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    progressBarContainer: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      marginBottom: "20px",
    },
    stepCircle: (active) => ({
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: active ? "#007bff" : "#eee",
      color: active ? "#fff" : "#888",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      position: "relative",
      zIndex: 1,
    }),
    stepLine: (active) => ({
      position: "absolute",
      top: "14px",
      left: "0",
      width: "100%",
      height: "4px",
      background: active ? "#007bff" : "#eee",
      zIndex: 0,
    }),
    stepLabel: { textAlign: "center", fontSize: "12px", marginTop: "6px", color: "#555" },
    orderItems: { borderTop: "1px solid #eee", paddingTop: "15px" },
    itemRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "12px",
    },
    itemInfo: { display: "flex", alignItems: "center", gap: "15px" },
    itemImg: { width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover", border: "1px solid #eee" },
    itemText: { display: "flex", flexDirection: "column" },
    payment: { fontSize: "14px", color: "#555", marginTop: "10px" },
    total: { fontWeight: "700", textAlign: "right", marginTop: "10px", fontSize: "16px" },
    noOrders: { textAlign: "center", fontSize: "18px", marginTop: "40px", color: "#777" },
  };

  const getStepIndex = (status) => statusSteps.indexOf(status);

  if (!orders || orders.length === 0) {
    return (
      <div style={styles.page}>
        <h2 style={styles.heading}>My Orders</h2>
        <p style={styles.noOrders}>You have no orders yet 🛒</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>My Orders</h2>

      {orders.map((order) => {
        const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
        const currentStep = getStepIndex(order.status);

        return (
          <div
            key={order.id}
            style={styles.orderCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {/* Order Header */}
            <div style={styles.orderHeader}>
              <div style={styles.orderInfo}>
                <p style={{ margin: 0, fontWeight: "600" }}>Order ID: {order.id}</p>
                <p style={{ margin: 0, color: "#555" }}>Date: {order.date}</p>
                <p style={{ margin: 0, color: "#555" }}>Status: {order.status}</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div style={styles.progressBarContainer}>
              {statusSteps.map((step, index) => {
                const active = index <= currentStep;
                return (
                  <div key={step} style={{ flex: 1, position: "relative" }}>
                    {index < statusSteps.length - 1 && <div style={styles.stepLine(index < currentStep)} />}
                    <div
                      style={styles.stepCircle(active)}
                      onClick={() => dispatch(updateStatus({ id: order.id }))}
                      title="Click to move to next status"
                    >
                      {index + 1}
                    </div>
                    <div style={styles.stepLabel}>{step}</div>
                  </div>
                );
              })}
            </div>

            {/* Order Items */}
            <div style={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <div style={styles.itemInfo}>
                    <img src={item.img} alt={item.name} style={styles.itemImg} />
                    <div style={styles.itemText}>
                      <p style={{ margin: 0 }}>{item.name}</p>
                      <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p style={{ fontWeight: "600" }}>₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
              <p style={styles.payment}>Payment: {order.paymentMethod}</p>
              <p style={styles.total}>Total: ₹{orderTotal.toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
/* =======================
   EachProductsCatogarie
======================= */
function EachProductsCatogarie(){
  return <><ProductCategoryDisplay/></>
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
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route
          path="/myorder"
          element={
            user ? <Order /> : <Navigate to="/" replace />
          }
        />
         <Route
          path="/product"
          element={
            user ? <EachProductsCatogarie /> : <Navigate to="/" replace />
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