import { signatureProducts } from "../data/products";
import { Link, useNavigate } from "react-router-dom";
import "./Collection.css";

function Collection() {
  const navigate = useNavigate();

  return (
    <div className="collection-page">

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      <h1 className="collection-title">Signature Collection</h1>

      <div className="collection-grid">
        {signatureProducts.map((product) => (
          <div className="collection-card" key={product.id}>
            
            <img src={product.image} alt={product.name} />

            <div className="card-content">
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
            </div>

            <Link to={`/product/${product.id}`}>
              <button className="luxury-btn">View Details</button>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
