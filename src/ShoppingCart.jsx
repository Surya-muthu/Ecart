// ShoppingCart.jsx
import React from "react";

const ShoppingCart = () => {
  return (
    <div className="container">
      {/* Main Content */}
      <main className="main">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-header">
            <p>Step 1 of 3: Cart Overview</p>
            <span>33% Complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-steps">
            <span className="active">Login</span>
            <span>Order Summary</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Cart & Sidebar */}
        <div className="cart-sidebar">
          {/* Left: Cart Items */}
          <div className="cart-items">
            {/* Delivery Address */}
            <div className="delivery-address">
              <div>
                <p>
                  Deliver to: <strong>Mumbai - 400001</strong>
                </p>
                <p>Home: Apartment 202, Sunshine Residency, Worli</p>
              </div>
              <button>Change</button>
            </div>

            {/* Cart Item 1 */}
            <div className="cart-item">
              <div className="item-image">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg3LNH6KXmFfqxOLY7KGXuCovRKmw8W-rd2bgAemTWD6HhXNv_KrpO55h04RRK8IzDFA5cABPCZxzhkQ7aJAGjmkK_UNyMmwXSoH9A0o6IQrwxt4XqS5heN2Gx6j7TlSPi8JbeJ0tE0s7fyHvt85pLcXmbwKiguJcW-0mX0eWMr-5K9trY8A8Uxeq39ZKjZEzqN_nuXT2qVkeu3snXRfLVPeouNzqjPro6-RsNDA_KMRAg6qlsXHmbE8c6po25WbbfNBwHDrjP9fU"
                  alt="Blue iPhone 15"
                />
              </div>
              <div className="item-details">
                <div className="item-header">
                  <div>
                    <h3>Apple iPhone 15 (Blue, 128 GB)</h3>
                    <p>
                      Seller: RetailNet{" "}
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUhWeJ7cAR1Qwna7Zd3CUPtvKs1bDIeqd4UhLKs0Dca5xaaljJWqGgsklsldW0DPkOi7_yKCEQ55cJ5GHYf84523_kAudnTeryd11HEC6gTR_bLgGSAjfuBR4P3r0hqBf2PpYoD1YWBSdU3o2J-yipu-8bgmec2G7AkRZV7V0K_IwJqqLgFzQUKHu8Sw8CsLISfgnIJ1bg6zGRtuTXuNeA6HY_WjKDWKLfN-7MPKiKNYVP9Y4nhh4NV_WkReHtoi8RdcgXEdJStFE"
                        alt="Flipkart Assured"
                        className="assured-logo"
                      />
                    </p>
                  </div>
                  <div className="item-price">
                    <p className="original-price">₹79,900</p>
                    <p className="discounted-price">₹69,999</p>
                    <p className="discount-text">12% Off applied</p>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <div className="other-actions">
                    <button>Save for later</button>
                    <button className="remove">Remove</button>
                  </div>
                </div>
                <p className="delivery-info">
                  🚚 Delivery by Sat, Oct 12 | <span>Free</span>{" "}
                  <span className="line-through">₹40</span>
                </p>
              </div>
            </div>

            {/* Cart Item 2 */}
            <div className="cart-item">
              <div className="item-image">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADvGWFyz2EAr9A1o0_rMqn6bzoAsgYcBZRuwBtTm5hKNkJaf3jKR8XbqWm64a3PzYROyPOOK-TCh12XRPfHDHTn6tWiK9AyQSMozX2RiuTLvWX8X8kzptZfykSvOwZvXQpwCyM3dTb-IHZrG5QsT5R2ISTA5zN4KnpcaPSqQctDq65IqbUWWICkbh7BGKv2USbmlEbKvu5hszJsZPFWZZu4_F2Br50CE1cWVBpptKQfy8WC60OhQrBvkRkYwv-uadXHF7R-Vaig8"
                  alt="Sony WH-1000XM5"
                />
              </div>
              <div className="item-details">
                <div className="item-header">
                  <div>
                    <h3>Sony WH-1000XM5 Wireless Headphones</h3>
                    <p>Seller: SonyRetail</p>
                  </div>
                  <div className="item-price">
                    <p className="original-price">₹34,990</p>
                    <p className="discounted-price">₹26,990</p>
                    <p className="discount-text">22% Off applied</p>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <div className="other-actions">
                    <button>Save for later</button>
                    <button className="remove">Remove</button>
                  </div>
                </div>
                <p className="delivery-info">
                  🚚 Delivery by Sun, Oct 13 | <span>Free</span>
                </p>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="place-order">
              <button>Place Order</button>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="sidebar">
            <div className="price-details">
              <h2>Price Details</h2>
              <div className="price-row">
                <span>Price (2 items)</span>
                <span>₹1,14,890</span>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <span>- ₹17,901</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span>
                  <span className="line-through">₹80</span> Free
                </span>
              </div>
              <div className="price-row">
                <span>Secured Packaging Fee</span>
                <span>₹59</span>
              </div>
              <hr />
              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹97,048</span>
              </div>
              <hr />
              <p className="savings">You will save ₹17,901 on this order</p>
            </div>
            <div className="trust">
              ✅ Safe and Secure Payments. Easy returns. 100% Authentic products.
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Flipkart Clone Desktop App. Minimalist E-commerce UI Design.</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .container {
          font-family: 'Inter', sans-serif;
          background: #f1f3f6;
          color: #101622;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        main {
          flex: 1;
          max-width: 1200px;
          margin: 20px auto;
          padding: 0 20px;
        }
        .progress-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .progress-bar {
          background: #e5e7eb;
          height: 10px;
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-fill {
          background: #135bec;
          width: 33%;
          height: 100%;
        }
        .progress-steps {
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
          font-size: 12px;
          margin-top: 5px;
        }
        .progress-steps .active {
          color: #135bec;
        }
        .cart-sidebar {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .cart-items {
          flex: 2.5;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .delivery-address {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 10px 20px;
          border-radius: 8px;
        }
        .delivery-address button {
          background: transparent;
          border: 1px solid #ccc;
          padding: 5px 10px;
          cursor: pointer;
        }
        .cart-item {
          display: flex;
          background: white;
          border-radius: 8px;
          padding: 20px;
          gap: 20px;
        }
        .item-image img {
          width: 128px;
          height: 128px;
          object-fit: contain;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
        }
        .item-price {
          text-align: right;
        }
        .original-price {
          text-decoration: line-through;
          color: #999;
        }
        .discounted-price {
          font-weight: bold;
        }
        .discount-text {
          color: green;
          font-size: 12px;
        }
        .item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .quantity input {
          width: 40px;
          text-align: center;
        }
        .other-actions button {
          margin-left: 10px;
        }
        .other-actions .remove {
          color: red;
        }
        .delivery-info {
          font-size: 12px;
          color: #555;
        }
        .place-order button {
          background: #135bec;
          color: white;
          padding: 10px 30px;
          border: none;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
        }
        .sidebar {
          flex: 1;
        }
        .price-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .price-details h2 {
          text-transform: uppercase;
          font-size: 12px;
          color: #555;
        }
        .price-row {
          display: flex;
          justify-content: space-between;
        }
        .total {
          font-size: 18px;
          font-weight: bold;
        }
        .savings {
          color: green;
          font-size: 12px;
        }
        .trust {
          margin-top: 10px;
          font-size: 12px;
          color: #555;
        }
        footer {
          text-align: center;
          padding: 20px;
          border-top: 1px solid #ccc;
          background: white;
          font-size: 12px;
          color: #999;
        }
        hr {
          border: 0.5px dashed #ccc;
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default ShoppingCart;
