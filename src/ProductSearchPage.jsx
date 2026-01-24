// // // import React, { useEffect, useState } from "react";
// // // import ProductModal from "./ProductModal";
// // // import { CartProvider } from "./CartContext";

// // // export default function ProductSearchpage() {
// // //   const [products, setProducts] = useState([]);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);

// // //   useEffect(() => {
// // //     // Detailed product data for modal/cart usage
// // //     const tempProducts = [
// // //       {
// // //         id: 1,
// // //         brand: "Apple",
// // //         name: "MacBook Air M2 - 8GB/256GB",
// // //         category: "Laptop",
// // //         price: 114990,
// // //         oldPrice: 129900,
// // //         rating: 4.8,
// // //         reviewCount: 5240,
// // //         stock: 15,
// // //         thumbnail: "https://picsum.photos/seed/macbookm2/400/400",
// // //         images: [
// // //           "https://picsum.photos/seed/mac1/600/600",
// // //           "https://picsum.photos/seed/mac2/600/600",
// // //           "https://picsum.photos/seed/mac3/600/600",
// // //         ],
// // //         description:
// // //           "Apple MacBook Air M2 delivers exceptional performance with incredible battery life in a thin and lightweight design.",
// // //         highlights: [
// // //           "Apple M2 Chip",
// // //           "8GB Unified Memory",
// // //           "256GB SSD",
// // //           "13.6-inch Liquid Retina Display",
// // //           "18 Hours Battery Life",
// // //         ],
// // //         specifications: {
// // //           Processor: "Apple M2",
// // //           RAM: "8 GB",
// // //           Storage: "256 GB SSD",
// // //           Display: "13.6-inch Retina",
// // //           OS: "macOS",
// // //           Weight: "1.24 kg",
// // //         },
// // //         seller: "Apple Authorized Store",
// // //         warranty: "1 Year Apple Warranty",
// // //         returnPolicy: "10 Days Replacement",
// // //         delivery: "Free Delivery by Tomorrow",
// // //       },
// // //       {
// // //         id: 2,
// // //         brand: "Dell",
// // //         name: "Vostro 3510 Intel Core i3",
// // //         category: "Laptop",
// // //         price: 41999,
// // //         oldPrice: 54999,
// // //         rating: 4.2,
// // //         reviewCount: 1870,
// // //         stock: 22,
// // //         thumbnail: "https://picsum.photos/seed/dellvostro/400/400",
// // //         images: [
// // //           "https://picsum.photos/seed/dell1/600/600",
// // //           "https://picsum.photos/seed/dell2/600/600",
// // //           "https://picsum.photos/seed/dell3/600/600",
// // //         ],
// // //         description:
// // //           "Dell Vostro 3510 is ideal for office work and daily productivity with reliable performance.",
// // //         highlights: [
// // //           "Intel Core i3 11th Gen",
// // //           "8 GB RAM",
// // //           "512 GB SSD",
// // //           "15.6 inch Full HD Display",
// // //           "Windows 11",
// // //         ],
// // //         specifications: {
// // //           Processor: "Intel Core i3 1115G4",
// // //           RAM: "8 GB",
// // //           Storage: "512 GB SSD",
// // //           Display: "15.6 inch FHD",
// // //           OS: "Windows 11",
// // //           Weight: "1.69 kg",
// // //         },
// // //         seller: "Dell Official Store",
// // //         warranty: "1 Year Onsite Warranty",
// // //         returnPolicy: "7 Days Replacement",
// // //         delivery: "Free Delivery in 2 Days",
// // //       },
// // //       {
// // //         id: 3,
// // //         brand: "HP",
// // //         name: "Pavilion Ryzen 5 Hexa Core",
// // //         category: "Laptop",
// // //         price: 58999,
// // //         oldPrice: 73999,
// // //         rating: 4.4,
// // //         reviewCount: 2430,
// // //         stock: 18,
// // //         thumbnail: "https://picsum.photos/seed/hppavilion/400/400",
// // //         images: [
// // //           "https://picsum.photos/seed/hp1/600/600",
// // //           "https://picsum.photos/seed/hp2/600/600",
// // //           "https://picsum.photos/seed/hp3/600/600",
// // //         ],
// // //         description:
// // //           "HP Pavilion Ryzen 5 laptop offers smooth multitasking and immersive visuals.",
// // //         highlights: [
// // //           "AMD Ryzen 5 5500U",
// // //           "16 GB RAM",
// // //           "512 GB SSD",
// // //           "15.6 inch IPS Display",
// // //           "Backlit Keyboard",
// // //         ],
// // //         specifications: {
// // //           Processor: "AMD Ryzen 5 5500U",
// // //           RAM: "16 GB",
// // //           Storage: "512 GB SSD",
// // //           Display: "15.6 inch IPS",
// // //           OS: "Windows 11",
// // //           Weight: "1.75 kg",
// // //         },
// // //         seller: "HP World",
// // //         warranty: "1 Year Onsite Warranty",
// // //         returnPolicy: "7 Days Replacement",
// // //         delivery: "Free Delivery Tomorrow",
// // //       },
// // //     ];

// // //     // Fill the rest up to 50 for the UI grid
// // //     const brands = ["Apple", "Dell", "HP", "ASUS", "Lenovo", "Acer", "MSI"];
// // //     const productNames = [
// // //       "MacBook Air M2 - 8GB/256GB",
// // //       "Vostro 3510 Intel Core i3",
// // //       "Pavilion Ryzen 5 Hexa Core",
// // //       "Vivobook 16X OLED i7",
// // //       "IdeaPad Slim 3 Intel i5",
// // //       "Aspire 5 Gaming Laptop",
// // //       "GF63 Thin Intel i5 11th Gen",
// // //     ];

// // //     for (let i = 4; i <= 50; i++) {
// // //       const brand = brands[Math.floor(Math.random() * brands.length)];
// // //       const name = productNames[Math.floor(Math.random() * productNames.length)];
// // //       const price = Math.floor(Math.random() * (120000 - 30000) + 30000);
// // //       const oldPrice = Math.floor(price * 1.3);
// // //       const rating = (Math.random() * (5 - 3.8) + 3.8).toFixed(1);
// // //       const reviewCount = Math.floor(Math.random() * 5000);
// // //       tempProducts.push({
// // //         id: i,
// // //         brand,
// // //         name,
// // //         price,
// // //         oldPrice,
// // //         rating,
// // //         reviewCount,
// // //         thumbnail: `https://picsum.photos/seed/${i + 100}/400/400`,
// // //       });
// // //     }

// // //     setProducts(tempProducts);
// // //   }, []);

// // //   return (
// // //     <CartProvider>
// // //       <link
// // //         href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
// // //         rel="stylesheet"
// // //       />
// // //       <style>{`
// // //         :root {
// // //           --primary: #135bec;
// // //           --bg-light: #f1f3f6;
// // //           --text-main: #0d121b;
// // //           --border-color: #e0e0e0;
// // //           --white: #ffffff;
// // //           --star-color: #388e3c;
// // //         }
// // //         *{box-sizing:border-box;margin:0;padding:0;}
// // //         body{font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;background-color:var(--bg-light);color:var(--text-main);line-height:1.5;}
// // //         main{max-width:1440px;margin:20px auto;display:flex;gap:16px;padding:0 16px;}
// // //         aside{width:280px;background:var(--white);border-radius:4px;height:fit-content;position:sticky;top:80px;box-shadow:0 2px 4px rgba(0,0,0,0.05);}
// // //         .filter-section{padding:16px;border-bottom:1px solid #f0f0f0;}
// // //         .filter-title{font-size:14px;font-weight:bold;margin-bottom:12px;text-transform:uppercase;}
// // //         .filter-item{display:flex;align-items:center;gap:10px;font-size:14px;margin-bottom:8px;cursor:pointer;}
// // //         section{flex:1;}
// // //         .sort-bar{background:var(--white);padding:16px;border-radius:4px;margin-bottom:16px;box-shadow:0 2px 4px rgba(0,0,0,0.05);}
// // //         #product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;}
// // //         .product-card{background:var(--white);border-radius:4px;padding:15px;display:flex;flex-direction:column;transition:box-shadow 0.3s;position:relative;text-decoration:none;color:inherit;cursor:pointer;}
// // //         .product-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.15);}
// // //         .product-card img{width:100%;height:200px;object-fit:contain;margin-bottom:10px;}
// // //         .product-name{font-size:14px;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
// // //         .rating-badge{background:var(--star-color);color:white;font-size:12px;padding:2px 6px;border-radius:4px;display:inline-flex;align-items:center;gap:2px;width:fit-content;}
// // //         .pricing{margin-top:auto;display:flex;align-items:center;gap:8px;padding-top:10px;}
// // //         .curr-price{font-weight:bold;font-size:16px;}
// // //         .old-price{text-decoration:line-through;color:#878787;font-size:13px;}
// // //         .discount{color:#388e3c;font-size:13px;font-weight:bold;}
// // //         .fav-btn{position:absolute;top:10px;right:10px;background:none;border:none;color:#ccc;cursor:pointer;}
// // //         @media (max-width:768px){aside{display:none;}#product-grid{grid-template-columns:repeat(2,1fr);}}
// // //       `}</style>

// // //       <main>
// // //         <aside>
// // //           <div className="filter-section">
// // //             <h1 style={{ fontSize: "18px" }}>Filters</h1>
// // //           </div>
// // //           <div className="filter-section">
// // //             <p className="filter-title">Categories</p>
// // //             <p style={{ color: "var(--primary)", fontSize: "14px" }}>
// // //               Electronics &gt; Laptops
// // //             </p>
// // //           </div>
// // //           <div className="filter-section">
// // //             <p className="filter-title">Brand</p>
// // //             <label className="filter-item">
// // //               <input type="checkbox" defaultChecked /> Apple
// // //             </label>
// // //             <label className="filter-item">
// // //               <input type="checkbox" defaultChecked /> Dell
// // //             </label>
// // //             <label className="filter-item">
// // //               <input type="checkbox" /> HP
// // //             </label>
// // //             <label className="filter-item">
// // //               <input type="checkbox" /> Asus
// // //             </label>
// // //           </div>
// // //           <div className="filter-section">
// // //             <p className="filter-title">Customer Ratings</p>
// // //             <label className="filter-item">
// // //               <input type="checkbox" /> 4★ & above
// // //             </label>
// // //             <label className="filter-item">
// // //               <input type="checkbox" /> 3★ & above
// // //             </label>
// // //           </div>
// // //         </aside>

// // //         <section>
// // //           <div className="sort-bar">
// // //             <p style={{ fontSize: "12px", color: "#888", marginBottom: "5px" }}>
// // //               Home &gt; Electronics &gt; Laptops
// // //             </p>
// // //             <h1 id="result-count" style={{ fontSize: "16px", marginBottom: "10px" }}>
// // //               Laptops (Showing {products.length} products)
// // //             </h1>
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 gap: "20px",
// // //                 fontSize: "14px",
// // //                 borderTop: "1px solid #f0f0f0",
// // //                 paddingTop: "10px",
// // //               }}
// // //             >
// // //               <span style={{ fontWeight: "bold" }}>Sort By</span>
// // //               <span style={{ color: "var(--primary)", borderBottom: "2px solid var(--primary)", cursor: "pointer" }}>
// // //                 Relevance
// // //               </span>
// // //               <span style={{ cursor: "pointer" }}>Popularity</span>
// // //               <span style={{ cursor: "pointer" }}>Price -- Low to High</span>
// // //             </div>
// // //           </div>

// // //           <div id="product-grid">
// // //             {products.map((p) => (
// // //               <div
// // //                 className="product-card"
// // //                 key={p.id}
// // //                 onClick={() => setSelectedProduct(p)}
// // //               >
// // //                 <img src={p.thumbnail || `https://picsum.photos/seed/${p.id + 100}/300/300`} alt={p.name} />
// // //                 <div className="product-name">{`${p.brand} ${p.name}`}</div>
// // //                 {p.rating && (
// // //                   <div style={{ marginBottom: "8px" }}>
// // //                     <span className="rating-badge">
// // //                       {p.rating}{" "}
// // //                       <span className="material-symbols-outlined" style={{ fontSize: "12px", fill: 1 }}>
// // //                         star
// // //                       </span>
// // //                     </span>
// // //                     <span style={{ fontSize: "12px", color: "#878787" }}>({p.reviewCount?.toLocaleString()})</span>
// // //                   </div>
// // //                 )}
// // //                 <div className="pricing">
// // //                   <span className="curr-price">₹{p.price?.toLocaleString()}</span>
// // //                   <span className="old-price">₹{p.oldPrice?.toLocaleString()}</span>
// // //                   <span className="discount">30% off</span>
// // //                 </div>
// // //                 {p.delivery && (
// // //                   <p style={{ fontSize: "12px", color: "#26a541", marginTop: "5px", fontWeight: 500 }}>
// // //                     {p.delivery}
// // //                   </p>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>
// // //       </main>

// // //       {selectedProduct && (
// // //         <ProductModal
// // //           selectedProduct={selectedProduct}
// // //           onClose={() => setSelectedProduct(null)}
// // //         />
// // //       )}
// // //     </CartProvider>
// // //   );
// // // }




















// // import React, { useEffect, useState, useContext } from "react";
// // import ProductModal from "./ProductModal";
// // import { CartProvider, CartContext } from "./CartContext";

// // export default function ProductSearchpage() {
// //   const [products, setProducts] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState(null);

// //   return (
// //     <CartProvider>
// //       <ProductSearchInner
// //         products={products}
// //         setProducts={setProducts}
// //         selectedProduct={selectedProduct}
// //         setSelectedProduct={setSelectedProduct}
// //       />
// //     </CartProvider>
// //   );
// // }

// // function ProductSearchInner({
// //   products,
// //   setProducts,
// //   selectedProduct,
// //   setSelectedProduct,
// // }) {
// //   const { addToCart } = useContext(CartContext);

// //   useEffect(() => {
// //     const tempProducts = [
// //       {
// //         id: 1,
// //         brand: "Apple",
// //         name: "MacBook Air M2 - 8GB/256GB",
// //         category: "Laptop",
// //         price: 114990,
// //         oldPrice: 129900,
// //         rating: 4.8,
// //         reviewCount: 5240,
// //         stock: 15,
// //         thumbnail: "https://picsum.photos/seed/macbookm2/400/400",
// //         description:
// //           "Apple MacBook Air M2 delivers exceptional performance with incredible battery life.",
// //         delivery: "Free Delivery by Tomorrow",
// //       },
// //       {
// //         id: 2,
// //         brand: "Dell",
// //         name: "Vostro 3510 Intel Core i3",
// //         price: 41999,
// //         oldPrice: 54999,
// //         rating: 4.2,
// //         reviewCount: 1870,
// //         thumbnail: "https://picsum.photos/seed/dellvostro/400/400",
// //         delivery: "Free Delivery in 2 Days",
// //       },
// //       {
// //         id: 3,
// //         brand: "HP",
// //         name: "Pavilion Ryzen 5 Hexa Core",
// //         price: 58999,
// //         oldPrice: 73999,
// //         rating: 4.4,
// //         reviewCount: 2430,
// //         thumbnail: "https://picsum.photos/seed/hppavilion/400/400",
// //         delivery: "Free Delivery Tomorrow",
// //       },
// //     ];

// //     for (let i = 4; i <= 50; i++) {
// //       tempProducts.push({
// //         id: i,
// //         brand: "Laptop Brand",
// //         name: `Model ${i}`,
// //         price: Math.floor(Math.random() * 80000 + 30000),
// //         oldPrice: Math.floor(Math.random() * 100000 + 50000),
// //         rating: (Math.random() * 1 + 4).toFixed(1),
// //         reviewCount: Math.floor(Math.random() * 5000),
// //         thumbnail: `https://picsum.photos/seed/${i + 100}/400/400`,
// //       });
// //     }

// //     setProducts(tempProducts);
// //   }, [setProducts]);

// //   return (
// //     <>
// //       <style>{`
// //         :root {
// //           --primary: #135bec;
// //           --white: #fff;
// //           --green: #388e3c;
// //         }
// //         body { background:#f1f3f6; font-family:Arial }
// //         #product-grid {
// //           display:grid;
// //           grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
// //           gap:12px;
// //         }
// //         .product-card {
// //           background:#fff;
// //           padding:14px;
// //           border-radius:4px;
// //           cursor:pointer;
// //           display:flex;
// //           flex-direction:column;
// //         }
// //         .product-card img {
// //           height:200px;
// //           object-fit:contain;
// //         }
// //         .product-name {
// //           font-size:14px;
// //           margin:10px 0;
// //         }
// //         .pricing {
// //           margin-top:auto;
// //           display:flex;
// //           gap:8px;
// //           align-items:center;
// //         }
// //         .curr-price { font-weight:bold }
// //         .old-price { text-decoration:line-through; color:#777 }
// //         .rating {
// //           background:var(--green);
// //           color:white;
// //           padding:2px 6px;
// //           font-size:12px;
// //           border-radius:4px;
// //           width:fit-content;
// //         }
// //         .add-cart-btn {
// //           margin-top:10px;
// //           background:var(--primary);
// //           color:white;
// //           border:none;
// //           padding:10px;
// //           font-size:14px;
// //           border-radius:4px;
// //           cursor:pointer;
// //         }
// //         .add-cart-btn:hover {
// //           background:#0f4bd6;
// //         }
// //       `}</style>

// //       <main style={{ maxWidth: "1400px", margin: "20px auto" }}>
// //         <div id="product-grid">
// //           {products.map((p) => (
// //             <div
// //               key={p.id}
// //               className="product-card"
// //               onClick={() => setSelectedProduct(p)}
// //             >
// //               <img src={p.thumbnail} alt={p.name} />
// //               <div className="product-name">
// //                 {p.brand} {p.name}
// //               </div>

// //               <div className="rating">
// //                 {p.rating} ★ ({p.reviewCount})
// //               </div>

// //               <div className="pricing">
// //                 <span className="curr-price">₹{p.price.toLocaleString()}</span>
// //                 <span className="old-price">
// //                   ₹{p.oldPrice.toLocaleString()}
// //                 </span>
// //               </div>

// //               <button
// //                 className="add-cart-btn"
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   addToCart(p);
// //                 }}
// //               >
// //                 ADD TO CART
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </main>

// //       {selectedProduct && (
// //         <ProductModal
// //           selectedProduct={selectedProduct}
// //           onClose={() => setSelectedProduct(null)}
// //         />
// //       )}
// //     </>
// //   );
// // }


// import React, { useEffect, useState, useContext } from "react";
// import ProductModal from "./ProductModal";
// import { AppContext } from "./AppContext"; // Use your main AppContext

// export default function ProductSearchpage() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   return (
//     <ProductSearchInner
//       products={products}
//       setProducts={setProducts}
//       selectedProduct={selectedProduct}
//       setSelectedProduct={setSelectedProduct}
//     />
//   );
// }

// function ProductSearchInner({ products, setProducts, selectedProduct, setSelectedProduct }) {
//   const { addToCart } = useContext(AppContext); // <- use global cart

//   useEffect(() => {
//     const tempProducts = [
//       {
//         id: 1,
//         brand: "Apple",
//         name: "MacBook Air M2 - 8GB/256GB",
//         price: 114990,
//         oldPrice: 129900,
//         rating: 4.8,
//         reviewCount: 5240,
//         thumbnail: "https://picsum.photos/seed/macbookm2/400/400",
//         delivery: "Free Delivery by Tomorrow",
//       },
//       {
//         id: 2,
//         brand: "Dell",
//         name: "Vostro 3510 Intel Core i3",
//         price: 41999,
//         oldPrice: 54999,
//         rating: 4.2,
//         reviewCount: 1870,
//         thumbnail: "https://picsum.photos/seed/dellvostro/400/400",
//         delivery: "Free Delivery in 2 Days",
//       },
//       {
//         id: 3,
//         brand: "HP",
//         name: "Pavilion Ryzen 5 Hexa Core",
//         price: 58999,
//         oldPrice: 73999,
//         rating: 4.4,
//         reviewCount: 2430,
//         thumbnail: "https://picsum.photos/seed/hppavilion/400/400",
//         delivery: "Free Delivery Tomorrow",
//       },
//     ];

//     for (let i = 4; i <= 50; i++) {
//       tempProducts.push({
//         id: i,
//         brand: "Laptop Brand",
//         name: `Model ${i}`,
//         price: Math.floor(Math.random() * 80000 + 30000),
//         oldPrice: Math.floor(Math.random() * 100000 + 50000),
//         rating: (Math.random() * 1 + 4).toFixed(1),
//         reviewCount: Math.floor(Math.random() * 5000),
//         thumbnail: `https://picsum.photos/seed/${i + 100}/400/400`,
//       });
//     }

//     setProducts(tempProducts);
//   }, [setProducts]);

//   return (
//     <>
//       <style>{`
//         :root { --primary: #135bec; --white: #fff; --green: #388e3c; }
//         body { background:#f1f3f6; font-family:Arial }
//         #product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:12px; }
//         .product-card { background:#fff; padding:14px; border-radius:4px; cursor:pointer; display:flex; flex-direction:column; }
//         .product-card img { height:200px; object-fit:contain; }
//         .product-name { font-size:14px; margin:10px 0; }
//         .pricing { margin-top:auto; display:flex; gap:8px; align-items:center; }
//         .curr-price { font-weight:bold }
//         .old-price { text-decoration:line-through; color:#777 }
//         .rating { background:var(--green); color:white; padding:2px 6px; font-size:12px; border-radius:4px; width:fit-content; }
//         .add-cart-btn { margin-top:10px; background:var(--primary); color:white; border:none; padding:10px; font-size:14px; border-radius:4px; cursor:pointer; }
//         .add-cart-btn:hover { background:#0f4bd6; }
//       `}</style>

//       <main style={{ maxWidth: "1400px", margin: "20px auto" }}>
//         <div id="product-grid">
//           {products.map((p) => (
//             <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
//               <img src={p.thumbnail} alt={p.name} />
//               <div className="product-name">{p.brand} {p.name}</div>
//               <div className="rating">{p.rating} ★ ({p.reviewCount})</div>
//               <div className="pricing">
//                 <span className="curr-price">₹{p.price.toLocaleString()}</span>
//                 <span className="old-price">₹{p.oldPrice.toLocaleString()}</span>
//               </div>
//               <button
//                 className="add-cart-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   addToCart(p); // <-- updates global cart
//                   alert(`${p.brand} ${p.name} added to cart!`);
//                 }}
//               >
//                 ADD TO CART
//               </button>
//             </div>
//           ))}
//         </div>
//       </main>

//       {selectedProduct && (
//         <ProductModal selectedProduct={selectedProduct} onClose={() => setSelectedProduct(null)} />
//       )}
//     </>
//   );
// }

import React, { useEffect, useState, useContext } from "react"; 
import ProductModal from "./ProductModal";
import { AppContext } from "./AppContext"; // <-- import your AppContext

export default function ProductSearchPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ProductSearchInner
      products={products}
      setProducts={setProducts}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
    />
  );
}

function ProductSearchInner({
  products,
  setProducts,
  selectedProduct,
  setSelectedProduct,
}) {
  const { addToCart } = useContext(AppContext); // <-- use AppContext here

  useEffect(() => {
    const tempProducts = [
      { id: 1, brand: "Apple", name: "MacBook Air M2 - 8GB/256GB", price: 114990, oldPrice: 129900, rating: 4.8, reviewCount: 5240, thumbnail: "https://picsum.photos/seed/macbookm2/400/400" },
      { id: 2, brand: "Dell", name: "Vostro 3510 Intel Core i3", price: 41999, oldPrice: 54999, rating: 4.2, reviewCount: 1870, thumbnail: "https://picsum.photos/seed/dellvostro/400/400" },
      { id: 3, brand: "HP", name: "Pavilion Ryzen 5 Hexa Core", price: 58999, oldPrice: 73999, rating: 4.4, reviewCount: 2430, thumbnail: "https://picsum.photos/seed/hppavilion/400/400" },
    ];

    for (let i = 4; i <= 50; i++) {
      tempProducts.push({
        id: i,
        brand: "Laptop Brand",
        name: `Model ${i}`,
        price: Math.floor(Math.random() * 80000 + 30000),
        oldPrice: Math.floor(Math.random() * 100000 + 50000),
        rating: (Math.random() * 1 + 4).toFixed(1),
        reviewCount: Math.floor(Math.random() * 5000),
        thumbnail: `https://picsum.photos/seed/${i + 100}/400/400`,
      });
    }

    setProducts(tempProducts);
  }, [setProducts]);

  return (
    <>
      <style>{`
        #product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:12px; }
        .product-card { background:#fff; padding:14px; border-radius:4px; cursor:pointer; display:flex; flex-direction:column; }
        .product-card img { height:200px; object-fit:contain; }
        .product-name { font-size:14px; margin:10px 0; }
        .pricing { margin-top:auto; display:flex; gap:8px; align-items:center; }
        .curr-price { font-weight:bold }
        .old-price { text-decoration:line-through; color:#777 }
        .rating { background:#388e3c; color:white; padding:2px 6px; font-size:12px; border-radius:4px; width:fit-content; }
        .add-cart-btn { margin-top:10px; background:#135bec; color:white; border:none; padding:10px; font-size:14px; border-radius:4px; cursor:pointer; }
        .add-cart-btn:hover { background:#0f4bd6; }
      `}</style>

      <div id="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card" onClick={() => setSelectedProduct(p)}>
            <img src={p.thumbnail} alt={p.name} />
            <div className="product-name">{p.brand} {p.name}</div>
            <div className="rating">{p.rating} ★ ({p.reviewCount})</div>
            <div className="pricing">
              <span className="curr-price">₹{p.price.toLocaleString()}</span>
              <span className="old-price">₹{p.oldPrice.toLocaleString()}</span>
            </div>
            <button
              className="add-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
                alert(`${p.brand} ${p.name} added to cart!`);
              }}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal selectedProduct={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
