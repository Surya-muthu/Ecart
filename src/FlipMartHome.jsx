import React, { useEffect, useState } from "react";

export default function FlipMartHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = [
      { name: "Wireless Headphones", price: "$129", brand: "Sony, JBL" },
      { name: "Smart Watch", price: "$99", brand: "Apple, Samsung" },
      { name: "Gaming Mouse", price: "$39", brand: "Logitech" },
      { name: "Bluetooth Speaker", price: "$59", brand: "Boat, JBL" },
      { name: "DSLR Camera", price: "$499", brand: "Canon, Nikon" },
      { name: "Running Shoes", price: "$69", brand: "Nike, Adidas" },
      { name: "Men's Jacket", price: "$89", brand: "Puma" },
      { name: "Women's Handbag", price: "$79", brand: "Zara" },
      { name: "Laptop Backpack", price: "$45", brand: "American Tourister" },
      { name: "Gaming Keyboard", price: "$55", brand: "Redragon" },
      { name: "Power Bank", price: "$25", brand: "Mi, Realme" },
      { name: "Wireless Earbuds", price: "$49", brand: "Boat" },
      { name: "LED Smart TV", price: "$699", brand: "Samsung" },
      { name: "Air Fryer", price: "$119", brand: "Philips" },
      { name: "Office Chair", price: "$149", brand: "Ikea" },
      { name: "Mechanical Keyboard", price: "$89", brand: "Keychron" },
      { name: "Fitness Band", price: "$35", brand: "Mi Band" },
      { name: "Vacuum Cleaner", price: "$159", brand: "Dyson" },
      { name: "Electric Kettle", price: "$29", brand: "Prestige" },
      { name: "Men's Sunglasses", price: "$19", brand: "Ray-Ban" },
      { name: "Mobile Tripod", price: "$15", brand: "Digitek" },
      { name: "Portable SSD", price: "$129", brand: "Samsung" },
      { name: "Gaming Chair", price: "$199", brand: "Green Soul" },
      { name: "Smart Home Plug", price: "$18", brand: "TP-Link" },
      { name: "Noise Cancelling Headphones", price: "$129", brand: "Sony, Bose" },
    ];

    setProducts(data);
  }, []);

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
        body{
          font-family:Inter,sans-serif;
          background:#f1f3f6;
          color:#0d121b;
        }
        img{max-width:100%;display:block}

        main{
          max-width:1280px;
          margin:auto;
          padding:20px;
          display:flex;
          flex-direction:column;
          gap:20px;
        }

        /* HERO */
        .hero{
          height:300px;
          border-radius:8px;
          background:
            linear-gradient(to right, rgba(0,0,0,.6), transparent),
            url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIaxtUa_uLHLhnUF9ztYjDdNDdXfC8a8e7y0DrN3qsNmq98T1jOZhISldyVT1HT-15zAef2OmEMxKuOEnhj5aVgMbNG3NNpsoNcxnlRa2boB03308DAjmYVWo68ZKZK02ZIyOUjiePLlbKMsFsNfhfsyd5U7sRAMkXQuoU4-KA6IUsVqDEF90zStn8K9yWleWcf6Nlev-pIs8LqXTolJdu-XWObZaba1Lmf6OOdnMjeGlMO802n_Yh4tsmjyDwi1S70NbV8XZsgUs")
            center/cover no-repeat;
          display:flex;
          align-items:center;
        }
        .hero-text{
          color:#fff;
          padding:40px;
          max-width:500px;
        }
        .hero-text h1{font-size:36px;margin-bottom:10px}
        .hero-text p{font-size:18px;margin-bottom:20px}
        .hero-text button{
          background:#135bec;
          border:none;
          color:#fff;
          padding:12px 30px;
          font-weight:700;
          cursor:pointer;
        }

        /* SECTION */
        .section{
          background:#fff;
          padding:20px;
          border-radius:4px;
        }
        .section-header h2{font-size:20px;margin-bottom:15px}

        /* PRODUCTS */
        .products{
          display:flex;
          gap:15px;
          overflow-x:auto;
        }
        .product{
          min-width:200px;
          border:1px solid #eee;
          padding:15px;
          text-align:center;
        }
        .product img{
          height:150px;
          object-fit:contain;
          margin-bottom:10px;
        }
        .product h4{font-size:14px;margin-bottom:5px}
        .price{color:green;font-weight:700;font-size:14px}
        .sub{font-size:12px;color:#777}

        /* FOOTER */
        footer{
          background:#111;
          color:#aaa;
          margin-top:40px;
        }
        .footer-top{
          max-width:1280px;
          margin:auto;
          padding:40px 20px;
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
          gap:30px;
        }
        footer h5{color:#fff;margin-bottom:10px;font-size:12px}
        footer ul{list-style:none;font-size:13px}
        footer li{margin-bottom:6px}
        .footer-bottom{
          border-top:1px solid #333;
          padding:20px;
          text-align:center;
          font-size:12px;
        }

        /* FAB */
        .fab{
          position:fixed;
          bottom:20px;
          right:20px;
          width:56px;
          height:56px;
          border-radius:50%;
          background:#135bec;
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
        }
      `}</style>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>Grand Summer Sale</h1>
            <p>Up to 80% Off on Top Global Brands</p>
            <button>SHOP NOW</button>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Best Deals of the Day</h2>
          </div>

          <div className="products">
            {products.map((p, i) => (
              <div className="product" key={i}>
                <img
                  src={`https://picsum.photos/300?random=${i + 1}`}
                  alt={p.name}
                />
                <h4>{p.name}</h4>
                <div className="price">{p.price}</div>
                <div className="sub">{p.brand}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div>
            <h5>ABOUT</h5>
            <ul>
              <li>Contact Us</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h5>HELP</h5>
            <ul>
              <li>Payments</li>
              <li>Returns</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2024 FlipMart.com</div>
      </footer>


    </>
  );
}
 