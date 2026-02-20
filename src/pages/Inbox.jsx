import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState } from "react";

function Inbox() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [messages, setMessages] = useState([]);

  const steps = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
  const STEP_INTERVAL = 5000; // 5 seconds per step

  // Load messages from localStorage on mount
  useEffect(() => {
    if (user) {
      const storedMessages =
        JSON.parse(localStorage.getItem(`messages_${user.email}`)) || [];
      setMessages(storedMessages.map(msg => ({ ...msg, status: msg.status ?? 0 })));
    }
  }, [user]);

  // Increment order status every interval
  useEffect(() => {
    if (!messages.length) return;

    const interval = setInterval(() => {
      setMessages(prev =>
        prev.map(msg => {
          if (msg.status < 4) {
            const updated = { ...msg, status: msg.status + 1 };
            return updated;
          }
          return msg; // stop at Delivered
        })
      );
    }, STEP_INTERVAL);

    return () => clearInterval(interval);
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`messages_${user.email}`, JSON.stringify(messages));
    }
  }, [messages, user]);

  const handleRemove = index => {
    const updated = [...messages];
    updated.splice(index, 1);
    setMessages(updated);
    localStorage.setItem(`messages_${user.email}`, JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          border: "none",
          background: "#111827",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Go Back
      </button>

      <h2>📬 Inbox for {user.name}</h2>

      {messages.length === 0 ? (
        <p>Your inbox is empty.</p>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#f9fafb",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{msg.title}</h4>
              <button
                onClick={() => handleRemove(idx)}
                style={{
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>

            <p>{msg.content}</p>
            <p><strong>Date:</strong> {msg.date}</p>

            <p><strong>Products:</strong></p>
            <ul>
              {msg.items?.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <p>
              <strong>Status:</strong> {steps[msg.status]}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Inbox;
