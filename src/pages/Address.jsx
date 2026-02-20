import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function Address() {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  // Load user addresses
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`address_${user.email}`)) || [];
    setAddresses(saved);
  }, [user.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.city ||
      !form.state ||
      !form.pincode ||
      !form.addressLine
    ) {
      alert("Please fill all fields");
      return;
    }

    const updated = [...addresses, { ...form, id: Date.now() }];

    localStorage.setItem(
      `address_${user.email}`,
      JSON.stringify(updated)
    );

    setAddresses(updated);

    setForm({
      fullName: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      addressLine: "",
    });
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    localStorage.setItem(
      `address_${user.email}`,
      JSON.stringify(updated)
    );
    setAddresses(updated);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>📍 Manage Addresses</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="addressLine"
          placeholder="Address"
          value={form.addressLine}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <button
          onClick={handleAddAddress}
          style={{
            display: "block",
            marginTop: "10px",
            padding: "8px 15px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Address
        </button>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {addresses.length === 0 ? (
        <p>No addresses added.</p>
      ) : (
        addresses.map((addr) => (
          <div
            key={addr.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <p><strong>{addr.fullName}</strong></p>
            <p>{addr.addressLine}</p>
            <p>{addr.city}, {addr.state} - {addr.pincode}</p>
            <p>📞 {addr.phone}</p>

            <button
              onClick={() => deleteAddress(addr.id)}
              style={{
                marginTop: "10px",
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
        ))
      )}
    </div>
  );
}

export default Address;
