import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function Orders() {
  const [user, setUser] = useState(getCurrentUser());

useEffect(() => {
  setUser(getCurrentUser());
}, []);
 if (!user) {
  return <Navigate to="/login" />;
}


  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

    setOrders(savedOrders);
  }, [user]);

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    localStorage.setItem(
      `orders_${user.email}`,
      JSON.stringify(updatedOrders)
    );

    setOrders(updatedOrders);
  };

  if (orders.length === 0) {
    return <h2 style={{ padding: "40px" }}>No orders yet.</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹ {order.total}</p>

          <div style={{ marginTop: "10px" }}>
            <Link
              to={`/order-success/${order.id}`}
              style={{
                marginRight: "15px",
                color: "blue",
                textDecoration: "none",
              }}
            >
              View Tracking
            </Link>

            <button
              onClick={() => deleteOrder(order.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
