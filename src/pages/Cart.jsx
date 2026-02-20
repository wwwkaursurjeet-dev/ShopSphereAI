import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, updateQuantity }) {
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <div>
                <h4>{item.name}</h4>
                <p>₹ {item.price}</p>
              </div>

              <div>
                <button onClick={() => updateQuantity(item.id, "dec")}>
                  -
                </button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>

                <button onClick={() => updateQuantity(item.id, "inc")}>
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹ {total}</h3>

          <Link to="/checkout">
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#111827",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
