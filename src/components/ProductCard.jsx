import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.3s",
      }}
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          onClick={() => navigate(`/product/${product.id}`)}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        />

        <h3 style={{ marginTop: "15px" }}>
          {product.name}
        </h3>

        <p style={{ color: "#16a34a", fontWeight: "bold" }}>
          ₹ {product.price}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        style={{
          marginTop: "15px",
          padding: "10px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
