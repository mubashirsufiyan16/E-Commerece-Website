import "./App.css";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Order from "./pages/Order.jsx"
import AddToCart from "./pages/AddToCart.jsx";
import Product from "./pages/Product.jsx";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />}/>
        <Route path="/Order" element={<Order />}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/AddToCart" element={<AddToCart />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;