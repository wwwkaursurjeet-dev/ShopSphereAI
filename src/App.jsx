import Collection from "./pages/Collection";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from "./utils/auth";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inbox from "./pages/Inbox";
import Header from "./components/Header";

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  // 🔥 LOAD CART BASED ON LOGGED-IN USER
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, []);

  // 🔥 SAVE CART WHENEVER IT CHANGES
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
      );
    }
  }, [cart]);

  const addToCart = (item) => {
    const exist = cart.find((p) => p.id === item.id);

    if (item.stock === 0) {
      setToast({ message: "Product is out of stock!", type: "error" });
      setTimeout(() => setToast(null), 2000);
      return;
    }

    if (exist) {
      if (exist.quantity >= item.stock) {
        setToast({ message: "No more stock available!", type: "error" });
        setTimeout(() => setToast(null), 2000);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );

      return;
    }

    setCart((prevCart) => [
      ...prevCart,
      { ...item, quantity: 1 }
    ]);

    setToast({ message: "Product added to cart!", type: "success" });
    setTimeout(() => setToast(null), 2000);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          if (type === "inc") {
            if (item.quantity >= item.stock) {
              setToast({ message: "Stock limit reached!", type: "error" });
              setTimeout(() => setToast(null), 2000);
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }

          return {
            ...item,
            quantity: Math.max(1, item.quantity - 1)
          };
        }
        return item;
      })
    );
  };

  return (
    <Router>
      <Header cart={cart} />

      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: toast.type === "success" ? "#22c55e" : "#ef4444",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontWeight: "bold",
            animation: "fadeIn 0.3s ease"
          }}
        >
          {toast.message}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />

        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Address />} />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/order-success/:id"
          element={<OrderSuccess />}
        />
      </Routes>
    </Router>
  );
}

export default App;
