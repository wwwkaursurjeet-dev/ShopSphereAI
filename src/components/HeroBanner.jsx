import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>MEGA SALE 2026</h1>
        <p>Up to 50% OFF on Electronics & Gadgets</p>
        <button onClick={() => navigate("/")} className="hero-btn">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default HeroBanner;
