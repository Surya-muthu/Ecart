import React, { useState } from "react";

// Sample JSON structure
const categoryData = {
  "Mobiles & Accessories": { "Chargers": ["Anker PowerPort III 20W Wall Charger"], "Earbuds / Headphones": ["Sony WF-1000XM5 True Wireless Earbuds","Sony WH-1000XM5 Headphones","Boat Rockerz 255 Neckband"], "Covers / Cases": ["Spigen Ultra Hybrid Back Cover for iPhone 14"], "Smartphones": ["Samsung Galaxy M13 Android Phone","Apple iPhone 14","Xiaomi Redmi Note 12","OnePlus Nord CE 3 Lite"], "Tablets": ["Amazon Fire HD 10 Tablet","Samsung Galaxy Tab A8"], "Wireless Chargers": ["Belkin Wireless Charger 15W"] },
  "Laptops & Gaming": { "Laptops": ["HP Pavilion 15 Laptop","Dell G15 Gaming Laptop","Asus ROG Strix G15 Gaming Laptop"], "Gaming Accessories": ["Logitech G502 Gaming Mouse"], "Consoles": ["Xbox Series X Console"] },
  "TVs & Appliances": { "Televisions": ["LG 4K Smart TV 55 Inch"], "Washing Machines": ["Bosch 6kg Front Load Washing Machine"] },
  "Fashion & Lifestyle": { "Men’s Clothing": { "Shirts": ["Levi's Men's Casual Shirt"], "Hoodies": ["Puma Men's Hoodie"], "Sports Shorts": ["Reebok Men's Sports Shorts"] }, "Men’s Footwear": ["Nike Men's Running Shoes"], "Men’s Accessories": ["Titan Analog Men's Watch","Fossil Men's Leather Wallet"], "Women’s Clothing": ["FabIndia Women's Cotton Kurta","Biba Women's Embroidered Lehenga","Zara Women Blouse"], "Women’s Footwear": ["Mango Women Heels"], "Women’s Accessories": ["H&M Women Handbag"], "Kids Clothing": ["Levi's Kids Boys Jeans","Levi's Boys T-Shirt","U.S. Polo Assn. Girls Top & Leggings Set","Carter's Infants Baby Set"], "Kids Footwear": ["Adidas Boys Sports Shoes","Puma Girls Casual Shoes"], "Infants": ["Rajnigandha Infants Romper"] },
  "Grocery & Daily Needs": { "Rice & Grains": ["Daawat Basmati Rice 5kg","Organic Brown Rice 2kg"], "Pulses": ["Toor Dal (Arhar) 1kg"], "Flour": ["Aashirvaad Whole Wheat Atta 5kg"], "Instant Foods": ["Maggi 2-Minute Noodles Masala 5-Pack"], "Cereals": ["Kellogg's Cornflakes 500g"], "Beverages": ["Tetley Green Tea 25 Bags","Bru Coffee Classic 250g"], "Fruits & Vegetables": ["Fresh Bananas 1kg","Organic Spinach 250g"] },
  "Home & Kitchen": { "Furniture": ["Wooden Queen Bed","Modern Fabric Sofa 3-Seater","Dining Table Set 6 Seater"], "Lighting": ["LED Ceiling Lamp Modern"], "Home Decor": ["Wall Art Painting - Abstract","Decorative Carpet - 5x7 ft","Wall Mounted Shelf Unit"], "Cookware & Bakeware": ["Non-Stick Cookware Set - 7 Pieces","Bakeware Set - 5 Pieces"], "Storage": ["Storage Container Set - 10 Pieces"] },
  "Beauty & Health": { "Skincare": ["Olay Regenerist Face Cream","Neutrogena Oil-Free Acne Wash"], "Hair Care": ["L'Oreal Paris Hair Fall Rescue Shampoo","Mamaearth Onion Hair Oil"], "Makeup": ["Maybelline Fit Me Matte + Poreless Foundation","Lakme Kajal Ultimate","L'Oreal Paris Color Riche Lipstick"], "Health Supplements": ["Himalaya Immunity Booster Herbal Tablets","GNC Multivitamin Tablets"], "Health Devices": ["Omron Digital Blood Pressure Monitor"] },
  "Sports, Fitness & Outdoor": {}
};

// Recursive component to render categories
const CategoryTree = ({ data, level = 0 }) => (
  <ul style={{ listStyle: "none", paddingLeft: level * 20 }}>
    {Object.entries(data).map(([key, value]) => (
      <li key={key} style={{ marginBottom: 6 }}>
        <span style={{ fontWeight: level === 0 ? 500 : 400, fontSize: level === 0 ? 14 : 13, color: "#222" }}>
          {key}
        </span>
        {Array.isArray(value) ? (
          <ul style={{ paddingLeft: 15, listStyleType: "disc" }}>
            {value.map(item => <li key={item} style={{ margin: "3px 0", fontSize: 13, color: "#555" }}>{item}</li>)}
          </ul>
        ) : Object.keys(value).length > 0 ? (
          <CategoryTree data={value} level={level + 1} />
        ) : (
          <span style={{ fontStyle: "italic", color: "#888", marginLeft: 5, fontSize: 13 }}>(No products yet)</span>
        )}
      </li>
    ))}
  </ul>
);

export default function ProductCategoryTabs() {
  const categories = Object.keys(categoryData);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Tabs */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        borderBottom: "2px solid #ddd",
        marginBottom: 10,
        background: "#fff"
      }}>
        {categories.map(cat => (
          <div
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              // fontWeight: 500,
              fontSize: 13,
              color: activeTab === cat ? "#007bff" : "#555",
              borderBottom: activeTab === cat ? "2px solid #007bff" : "2px solid transparent",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        width: "100%",
        padding: 15,
        background: "#f9f9f9",
        minHeight: 300,
        boxSizing: "border-box"
      }}>
        <CategoryTree data={{ [activeTab]: categoryData[activeTab] }} />
      </div>
    </div>
  );
}
