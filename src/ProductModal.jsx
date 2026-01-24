import React from "react";  
import { useCart } from "./CartContext";

export default function ProductModal({ selectedProduct, onClose }) {
  const { addToCart } = useCart();
  if (!selectedProduct) return null;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
          padding: "10px",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "#fff",
            width: "850px",
            maxWidth: "95%",
            borderRadius: "12px",
            display: "flex",
            overflow: "hidden",
            fontFamily: "Inter,sans-serif",
            height: "500px", // ✅ fixed height
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Image */}
          <div style={{ width: "45%", padding: "16px", background: "#f9fafb" }}>
            <img
              src={`https://picsum.photos/seed/${selectedProduct.id}/400/400`}
              alt={selectedProduct.name}
              style={{ width: "100%", objectFit: "contain", borderRadius: "6px", maxHeight: "100%" }}
            />
          </div>

          {/* Right Details */}
          <div style={{ width: "55%", padding: "16px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "6px" }}>
              {selectedProduct.brand} {selectedProduct.name}
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  fontWeight: 700,
                }}
              >
                {selectedProduct.rating} ★
              </div>
              <span>{selectedProduct.reviewCount || "N/A"} Reviews</span>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "12px",
              }}
            >
              <strong style={{ fontSize: "24px" }}>
                ₹{selectedProduct.price.toLocaleString()}
              </strong>
              <del style={{ color: "#6b7280", fontSize: "16px", marginLeft: "8px" }}>
                ₹{selectedProduct.oldPrice?.toLocaleString()}
              </del>
              {selectedProduct.discount && (
                <span style={{ color: "#16a34a", fontWeight: 700, marginLeft: "8px" }}>
                  {selectedProduct.discount} off
                </span>
              )}
            </div>

            {/* Offers */}
            {selectedProduct.offers?.length > 0 && (
              <div style={{ marginBottom: "12px" }}>
                <h3 style={{ fontSize: "13px", marginBottom: "6px" }}>Available Offers</h3>
                {selectedProduct.offers.map((offer, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", fontSize: "13px", marginBottom: "4px" }}>
                    ✔ {offer}
                  </div>
                ))}
              </div>
            )}

            {/* Specifications */}
            {selectedProduct.specifications && (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              >
                <h4 style={{ background: "#f3f4f6", padding: "8px", fontSize: "14px" }}>
                  Specifications
                </h4>
                {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      padding: "4px 12px",
                      fontSize: "13px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span style={{ color: "#6b7280" }}>{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  onClose();
                }}
                style={{
                  flex: 1,
                  height: "44px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#135bec",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>


              

              <button
                style={{
                  flex: 1,
                  height: "44px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#fb641b",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
