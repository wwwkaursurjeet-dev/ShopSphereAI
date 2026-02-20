import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import "./Home.css";
import { products } from "../data/products.js";
import Categories from "../components/Categories";

function Home() {
  const infiniteProducts = [...products, ...products];

  return (
    <div>
      {/* Hero Banner */}
      <div className="fade-in">
        <HeroBanner />
      </div>

      {/* Categories Section */}
      <Categories />

      {/* Trending Products */}
      <div className="scroll-section fade-in">
        <h2>🔥 Trending Products</h2>
        <div className="scroll-container">
          <div className="scroll-track">
            {infiniteProducts.map((product, index) => (
              <div className="scroll-card" key={`${product.id}-${index}`}>
                <div className="image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="scroll-image"
                  />
                </div>

                <h4>{product.name}</h4>
                <p className="scroll-price">₹ {product.price}</p>

                {/* Stock Badge */}
                {product.stock === 0 && (
                  <span
                    style={{
                      background: "#ef4444",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginBottom: "6px",
                    }}
                  >
                    Out of Stock
                  </span>
                )}

                {product.stock > 0 && product.stock <= 2 && (
                  <span
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginBottom: "6px",
                    }}
                  >
                    Only {product.stock} left
                  </span>
                )}

                <Link to={`/product/${product.id}`}>
                  <button className="scroll-btn">View</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Luxury Banner */}
      <div className="luxury-banner">
        <div className="luxury-banner-text">
          <h2>Introducing The Signature Collection</h2>
          <p>
            Designed with precision and crafted for elegance.
            Experience a new standard of premium lifestyle.
          </p>
          <Link to="/collection">
            <button className="luxury-btn">Explore Collection</button>
          </Link>
        </div>

        <div className="luxury-banner-image">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Luxury Product"
          />
        </div>
      </div>

      {/* Features */}
      <div className="luxury-features">
        <div className="feature-card">
          <h3>Free Worldwide Shipping</h3>
          <p>Fast and secure delivery on all premium orders.</p>
        </div>

        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>Protected transactions with industry-grade encryption.</p>
        </div>

        <div className="feature-card">
          <h3>Premium Quality</h3>
          <p>Carefully curated products crafted to perfection.</p>
        </div>
      </div>

      {/* Cinematic Banner */}
      <div className="cinematic-banner">
        <div className="cinematic-overlay">
          <h2>Crafted For Those Who Value Excellence</h2>
          <Link to="/about">
            <button className="luxury-btn">Discover More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
