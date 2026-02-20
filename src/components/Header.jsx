import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";

function Header({ cart }) {
  const totalItems = cart.length;
  const [animate, setAnimate] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  // Update header when localStorage changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header style={headerStyle}>
      <h2 style={{ fontWeight: "700", letterSpacing: "1px" }}>ShopSphere</h2>

      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        <Link to="/checkout" style={linkStyle}>Checkout</Link>
        <Link to="/orders" style={linkStyle}>Orders</Link>

        {!user ? (
          <Link to="/login" style={linkStyle}>Login</Link>
        ) : (
          <span style={userStyle}>Hello, {user.name}</span>
        )}

        <Link to="/cart" className="cart-link" style={cartLinkStyle}>
          <div className={`cart-box ${animate ? "cart-bounce" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="1.8"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13L5.4 5M16 21a1 1 0 100-2 1 1 0 000 2zM8 21a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </div>

          {totalItems > 0 && (
            <span className={`cart-badge ${animate ? "cart-bounce" : ""}`}>
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  background: "#111827",
  color: "white",
};

const navStyle = { display: "flex", alignItems: "center" };
const linkStyle = { color: "white", textDecoration: "none", marginLeft: "20px", fontWeight: "bold" };
const cartLinkStyle = { position: "relative", marginLeft: "25px", display: "flex", alignItems: "center", textDecoration: "none" };
const userStyle = { marginLeft: "20px", fontWeight: "bold" };

export default Header;
