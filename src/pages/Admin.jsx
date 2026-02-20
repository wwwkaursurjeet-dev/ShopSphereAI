import { useState } from "react";

function Admin() {
  const PASSWORD = "Navdeep123"; // only you know this
  const [auth, setAuth] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // Product form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("trending");

  const handleLogin = () => {
    if (passwordInput === PASSWORD) setAuth(true);
    else alert("Wrong password!");
  };

  const handleAddProduct = () => {
    if (!name || !price || !image) {
      alert("Name, price, and image are required!");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("shopSphereProducts") || "[]");
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      description,
      image,
      category,
    };
    localStorage.setItem("shopSphereProducts", JSON.stringify([...stored, newProduct]));

    alert("Product added!");
    // reset form
    setName(""); setPrice(""); setDescription(""); setImage(""); setCategory("trending");
  };

  if (!auth) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL or local path"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="trending">Trending</option>
          <option value="hero">Hero</option>
          <option value="signature">Signature</option>
        </select>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <p>All products added via this panel are stored in your browser localStorage.</p>
    </div>
  );
}

export default Admin;
