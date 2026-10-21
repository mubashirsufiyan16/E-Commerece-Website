import "./App.css";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import Order from "./pages/Order"
import AddToCart from "./pages/AddToCart";
import Product from "./pages/Product";
import NotFound from "./components/NotFound"
import products from "./data/Products";


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
       <Route path="/product" element={<Product product={products} />} />
        <Route path="/AddToCart" element={<AddToCart />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;