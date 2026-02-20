import { Link } from "react-router-dom";

function Navbar({ cart }) {
  return (
    <nav
      style={{
        background: "#111827",
        padding: "15px 0",
        color: "white",
      }}
    >
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ color: "#22c55e" }}>🛒 ShopSphereAI</h2>

        <div>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/cart" style={linkStyle}>
            Cart ({cart.length})
          </Link>
          <Link to="/checkout" style={linkStyle}>
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  marginLeft: "20px",
  color: "white",
  textDecoration: "none",
  fontWeight: "500"
};

export default Navbar;
