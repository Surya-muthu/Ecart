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
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
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

function CheckoutModal({
  step,
  setStep,
  address,
  setAddress,
  paymentMethod,
  setPaymentMethod,
  total,
  onClose,
  onConfirm,
}) {
  const [useOldAddress, setUseOldAddress] = React.useState(true);
  const oldAddress = "123, Main Street, Demo City, 110011";

  const styles = {
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "15px",
      overflowY: "auto",
    },
    modal: {
      background: "#fff",
      borderRadius: "16px",
      maxWidth: "500px",
      width: "100%",
      padding: "30px 25px",
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      position: "relative",
    },
    closeBtn: {
      position: "absolute",
      top: "20px",
      right: "20px",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      background: "rgba(0,0,0,0.6)",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    steps: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    step: {
      flex: 1,
      textAlign: "center",
      padding: "6px 0",
      borderBottom: "3px solid #ddd",
      color: "#777",
      fontWeight: 500,
    },
    activeStep: {
      borderBottom: "3px solid #007bff",
      color: "#007bff",
      fontWeight: 600,
    },
    btn: {
      padding: "10px 18px",
      background: "linear-gradient(90deg, #007bff, #0056d2)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 600,
    },
    backBtn: {
      padding: "10px 18px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      cursor: "pointer",
      background: "#f8f8f8",
      color: "#333",
    },
    textarea: {
      width: "100%",
      minHeight: "80px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      resize: "none",
    },
    paymentCard: {
      padding: "14px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      cursor: "pointer",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontWeight: 500,
      transition: "all 0.2s ease",
    },
    selectedPayment: {
      borderColor: "#007bff",
      background: "#e6f0ff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    addressToggle: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "12px",
    },
    addressOption: (active) => ({
      flex: 1,
      padding: "10px",
      marginRight: "8px",
      borderRadius: "8px",
      border: `1px solid ${active ? "#007bff" : "#ccc"}`,
      background: active ? "#e6f0ff" : "#f8f8f8",
      cursor: "pointer",
      textAlign: "center",
      fontWeight: 500,
    }),
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        {/* CLOSE BUTTON */}
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* STEPS */}
        <div style={styles.steps}>
          <span style={{ ...styles.step, ...(step === 1 ? styles.activeStep : {}) }}>Address</span>
          <span style={{ ...styles.step, ...(step === 2 ? styles.activeStep : {}) }}>Payment</span>
          <span style={{ ...styles.step, ...(step === 3 ? styles.activeStep : {}) }}>Confirm</span>
        </div>

        {/* STEP 1: ADDRESS */}
        {step === 1 && (
          <div>
            <div style={styles.addressToggle}>
              <div
                style={styles.addressOption(useOldAddress)}
                onClick={() => {
                  setUseOldAddress(true);
                  setAddress(oldAddress);
                }}
              >
                Use Old Address
              </div>
              <div
                style={styles.addressOption(!useOldAddress)}
                onClick={() => {
                  setUseOldAddress(false);
                  setAddress(""); // clear value when adding new address
                }}
              >
                Add New Address
              </div>
            </div>

            {!useOldAddress && (
              <textarea
                style={styles.textarea}
                placeholder="House no, Street, City, Pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}

            <button
              style={styles.btn}
              disabled={!address || address.length < 5}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT */}
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
                {paymentMethod === method && " ✓"}
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
              <button style={styles.backBtn} onClick={() => setStep(1)}>Back</button>
              <button style={styles.btn} disabled={!paymentMethod} onClick={() => setStep(3)}>Continue</button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRM */}
        {step === 3 && (
          <div>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Payment:</strong> {paymentMethod?.toUpperCase()}</p>
            <p><strong>Total:</strong> ₹{total?.toLocaleString()}</p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
              <button style={styles.backBtn} onClick={() => setStep(2)}>Back</button>
              <button style={styles.btn} onClick={onConfirm}>Pay Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Cart() {
  const { items, orderConfirmed } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [hoveredItem, setHoveredItem] = useState(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const styles = {
    page: { padding: "30px 20px", maxWidth: "900px", margin: "0 auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" },
    h2: { textAlign: "center", marginBottom: "25px", color: "#222", fontSize: "28px" },
    cartItem: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", padding: "15px", borderRadius: "12px", marginBottom: "12px", background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" },
    cartItemHover: { transform: "translateY(-2px)", boxShadow: "0 6px 16px rgba(0,0,0,0.12)" },
    cartItemLeft: { display: "flex", alignItems: "center", gap: "15px" },
    cartItemImg: { width: "90px", height: "90px", objectFit: "cover", borderRadius: "10px", border: "1px solid #eee" },
    quantityControls: { display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" },
    btn: { padding: "8px 18px", background: "linear-gradient(90deg, #007bff, #0056d2)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", transition: "all 0.2s ease" },
    removeBtn: { padding: "6px 12px", width: "250px", background: "#ff4d4f", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", transition: "all 0.2s ease" },
    clearBtn: { padding: "8px 18px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "10px", transition: "all 0.2s ease" },
    cartFooter: { marginTop: "25px", textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, animation: "fadeIn 0.3s ease" },
    modal: { background: "#fff", padding: "35px 25px", borderRadius: "12px", maxWidth: "500px", width: "100%", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", transform: "translateY(0)", animation: "slideIn 0.3s ease" },
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.h2}>Your Cart</h2>

      {items.length === 0 && <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty 🛒</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{ ...styles.cartItem, ...(hoveredItem === item.id ? styles.cartItemHover : {}) }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div style={styles.cartItemLeft}>
            <img src={item.images?.[0]} alt={item.name} style={styles.cartItemImg} />
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: "5px 0" }}>₹{item.price.toLocaleString()}</p>
              <div style={styles.quantityControls}>
                <button style={styles.btn} onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "dec" }))}>-</button>
                <span style={{ fontWeight: "600", minWidth: "25px", textAlign: "center" }}>{item.quantity}</span>
                <button style={styles.btn} onClick={() => dispatch(cartSlice.actions.changeQuantity({ id: item.id, type: "inc" }))}>+</button>
              </div>
            </div>
          </div>
          <button style={styles.removeBtn} onClick={() => dispatch(cartSlice.actions.removeFromCart(item.id))}>Remove</button>
        </div>
      ))}

      {items.length > 0 && (
        <div style={styles.cartFooter}>
          <button style={styles.clearBtn} onClick={() => dispatch(cartSlice.actions.clearCart())}>Clear Cart</button>
          <h3 style={{ margin: 0 }}>Total: ₹{total.toLocaleString()}</h3>
          <button style={styles.btn} onClick={() => (!user ? navigate("/login") : setShowCheckout(true))}>Place Order</button>
        </div>
      )}

      {orderConfirmed && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>🎉 Order Placed Successfully</h2>
            <p>Thank you for shopping with us.</p>
            <button style={styles.btn} onClick={() => navigate("/")}>Continue Shopping</button>
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
          onClose={() => setShowCheckout(false)}
          onConfirm={() => {
            dispatch(cartSlice.actions.confirmOrder());
            setShowCheckout(false);
          }}
        />
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