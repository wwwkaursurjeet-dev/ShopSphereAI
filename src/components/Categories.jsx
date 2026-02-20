import React from "react";
import "./Categories.css";

const categories = [
  { name: "Electronics", image: "electronics.jpg" },
  { name: "Stationery", image: "stationery.jpg" },
  { name: "Clothing", image: "clothing.jpg" },
  { name: "Toys & Kids", image: "toys.jpg" },
  { name: "Groceries", image: "groceries.jpg" },
  { name: "Home & Kitchen", image: "home.jpg" },
  { name: "Sports & Fitness", image: "sports.jpg" },
  { name: "Beauty & Personal Care", image: "beauty.jpg" },
];

const Categories = () => {
  return (
    <div className="categories-container">
      {categories.map((cat, index) => {
        // Correct way to reference images in Vite
        const imageUrl = new URL(`../assets/categories/${cat.image}`, import.meta.url).href;
        return (
          <div key={index} className="category-card">
            <img src={imageUrl} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
