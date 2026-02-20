import { useParams, useNavigate } from "react-router-dom";
import { products, signatureProducts } from "../data/products";
import "./ProductDetails.css";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const allProducts = [...products, ...signatureProducts];

  const product = allProducts.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-details">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      <div className="details-container">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="details-price">₹ {product.price}</p>

          {/* STOCK DISPLAY */}
          <p style={{
            color: product.stock === 0 ? "red" : "#22c55e",
            fontWeight: "bold"
          }}>
            {product.stock === 0
              ? "Out of Stock"
              : `In Stock (${product.stock} left)`}
          </p>

          <p className="details-description">
            Crafted with precision and designed for those who appreciate
            refined elegance. Experience premium quality and timeless design.
          </p>

          <button
            className="luxury-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            style={{
              opacity: product.stock === 0 ? 0.5 : 1,
              cursor: product.stock === 0 ? "not-allowed" : "pointer"
            }}
          >
            {product.stock === 0 ? "Unavailable" : "Add to Cart"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
