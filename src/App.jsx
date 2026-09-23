import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./components/Cart.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Order from "./pages/Order.jsx"
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="checkout" element={<CheckOut />}/>
        <Route path="/Order" element={<Order />}/>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;