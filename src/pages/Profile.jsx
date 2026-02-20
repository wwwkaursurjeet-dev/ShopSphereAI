import { getCurrentUser, logoutUser } from "../utils/auth";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  // 🔒 Protect Page
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={goBackButtonStyle}>
        ← Go Back
      </button>

      <h2>👤 My Profile</h2>

      <div style={cardStyle}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Login Type:</strong>{" "}
          {user.provider === "google" ? "Google Account" : "Email & Password"}
        </p>

        {/* 📍 Manage Addresses */}
        <Link to="/address" style={primaryButtonStyle}>
          Manage Addresses
        </Link>

        {/* 📬 Inbox */}
        <Link to="/inbox" style={secondaryButtonStyle}>
          Inbox
        </Link>

        {/* 🚪 Logout */}
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  maxWidth: "600px",
  margin: "auto",
};

const goBackButtonStyle = {
  padding: "8px 14px",
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginBottom: "20px",
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const primaryButtonStyle = {
  padding: "10px 15px",
  background: "#111827",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  textAlign: "center",
};

const secondaryButtonStyle = {
  padding: "10px 15px",
  background: "#2563eb",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  textAlign: "center",
};

const logoutButtonStyle = {
  padding: "10px 15px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Profile;
