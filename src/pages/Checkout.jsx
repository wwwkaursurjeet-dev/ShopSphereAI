import { useNavigate, Navigate } from "react-router-dom";
import { products, signatureProducts } from "../data/products";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState } from "react";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // 🔒 Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔥 Redirect if cart is empty
  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  // Load saved addresses
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`address_${user.email}`)) || [];
    setAddresses(saved);
  }, [user.email]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.floor(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    for (let item of cart) {
      if (item.quantity > item.stock) {
        alert(`Not enough stock for ${item.name}`);
        return;
      }
    }

    // Reduce product stock locally
    cart.forEach((cartItem) => {
      const allProducts = [...products, ...signatureProducts];
      const product = allProducts.find((p) => p.id === cartItem.id);
      if (product) product.stock -= cartItem.quantity;
    });

    // Create dropshipping-ready order
    const newOrder = {
      id: "ORD-" + Date.now(),
      date: new Date().toLocaleString(),
      customerName: user.name,
      customerEmail: user.email,
      address: selectedAddress,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        supplier: item.supplier,
        supplierLink: item.supplierLink,
      })),
      subtotal,
      tax,
      shipping,
      total,
      status: "Pending", // Pending → Processing → Shipped → Delivered
    };

    // Save in central dropshipping orders (for admin)
    const allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    localStorage.setItem("allOrders", JSON.stringify([newOrder, ...allOrders]));

    // Save per-user orders as well
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
    localStorage.setItem(`orders_${user.email}`, JSON.stringify([newOrder, ...existingOrders]));

    // Add order message to Inbox
    const existingMessages = JSON.parse(localStorage.getItem(`messages_${user.email}`)) || [];
    const orderMessage = {
      title: `Order Placed: ${newOrder.id}`,
      content: `Your order has been successfully placed!`,
      items: newOrder.items,
      date: newOrder.date,
    };
    localStorage.setItem(
      `messages_${user.email}`,
      JSON.stringify([orderMessage, ...existingMessages])
    );

    // Clear cart and navigate
    setCart([]);
    navigate(`/order-success/${newOrder.id}`);
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h2>💳 Checkout</h2>

      <h3>Select Delivery Address</h3>

      {addresses.length === 0 ? (
        <p>No address found. Please add one in profile.</p>
      ) : (
        addresses.map((addr) => (
          <div
            key={addr.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              background: selectedAddress?.id === addr.id ? "#e0f2fe" : "white",
            }}
            onClick={() => setSelectedAddress(addr)}
          >
            <p><strong>{addr.fullName}</strong></p>
            <p>{addr.addressLine}</p>
            <p>{addr.city}, {addr.state} - {addr.pincode}</p>
          </div>
        ))
      )}

      <hr style={{ margin: "20px 0" }} />

      <h3>Order Summary</h3>
      {cart.map((item) => (
        <p key={item.id}>
          {item.name} x {item.quantity} → ₹{item.price * item.quantity} 
          <br />
          <small>Supplier: {item.supplier}</small>
        </p>
      ))}
      <p>Subtotal: ₹ {subtotal}</p>
      <p>Tax (5%): ₹ {tax}</p>
      <p>Shipping: ₹ {shipping}</p>
      <h3>Total: ₹ {total}</h3>

      <button
        onClick={handlePlaceOrder}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#111827",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;