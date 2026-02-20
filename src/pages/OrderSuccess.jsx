import { Link, useParams, Navigate } from "react-router-dom";
import { getCurrentUser, addMessage } from "../utils/auth"; // ✅ addMessage
import "./OrderSuccess.css";

function OrderSuccess() {
  const { id } = useParams();
  const user = getCurrentUser();

  // 🔒 Protect route
  if (!user) {
    return <Navigate to="/login" />;
  }

  const orders =
    JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="order-wrapper">
        <div className="order-card">
          <h2>Order not found.</h2>
          <Link to="/" className="order-btn">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // 🔥 Send a shipping message to Inbox after 5 seconds
  setTimeout(() => {
    addMessage({
      title: `Order #${order.id} Shipped 🚚`,
      content: `Your order has been shipped and will arrive soon!`,
      orderId: order.id,
      items: order.items, // include product details
      date: new Date().toLocaleString(),
    });
  }, 5000);

  const orderDate = new Date(order.date);
  const today = new Date();
  const diffDays = Math.floor(
    (today - orderDate) / (1000 * 60 * 60 * 24)
  );

  let currentStep = 0;
  if (diffDays >= 1) currentStep = 1;
  if (diffDays >= 2) currentStep = 2;
  if (diffDays >= 3) currentStep = 3;
  if (diffDays >= 4) currentStep = 4;

  const steps = [
    "Order Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="order-wrapper">
      <div className="order-card">
        <h2 className="success-title">
          📦 Order Tracking
        </h2>

        {/* 🔥 ORDER INFO */}
        <div className="order-info">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹ {order.total}</p>
        </div>

        {/* 🔥 DELIVERY ADDRESS SECTION */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #e5e7eb"
          }}
        >
          <h3>Delivery Address</h3>
          <p><strong>{order.address.fullName}</strong></p>
          <p>{order.address.addressLine}</p>
          <p>
            {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
          <p>📞 {order.address.phone}</p>
        </div>

        <h3 className="items-title" style={{ marginTop: "25px" }}>
          Delivery Status
        </h3>

        <div className="tracking-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`tracking-step ${
                index <= currentStep ? "active" : ""
              }`}
            >
              <div className="circle"></div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="order-btn">
          Continue Shopping
        </Link>

        <Link to="/inbox" className="order-btn" style={{ marginTop: "10px" }}>
          Go to Inbox 📬
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
