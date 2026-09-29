
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Badge } from "antd";

import Product from "../../pages/Product.jsx";

import quantity from "../../pages/Product.jsx";
import AddToCart from "../../pages/AddToCart.jsx"

import { useEffect, useState } from "react";

import "../../App.css";

function Navbar() {
  const navigate = useNavigate();

  let { state } = useLocation();

  let cartCount = JSON.parse(localStorage.getItem("cartProduct")) || [];

  const [badgeValue, setBadgeValue] = useState(0);

  useEffect(() => {
    setBadgeValue(cartCount?.length || 0);
  }, [cartCount.length]);

  const handleLogOut = () => {
    navigate("/login");
  };

  const handleCart = () => {
    navigate(
      "/AddToCart",
      (state = {
        product: Product,
        quantity: quantity,
      }),
    );
  };

  return (
    <>
      <div className="nav">
        <ul>
          <h3
            style={{
              fontFamily: "emoji",
              fontSize: "30px",
            }}
          >
            DASHBOARD
          </h3>
        </ul>

        <div>
          <Button
            style={{
              backgroundColor: "#1677ff",
              color: "white",
              fontSize: "30px",
              padding: "20px",
              fontFamily: "math",
              textTransform: "capitalize",
            }}
            onClick={handleLogOut}
            id="logoutbtn"
          >
            Logout
          </Button>

          <Badge count={badgeValue}>
            <Button
              onClick={handleCart}
              style={{
                color: "white",
                background: "transparent",
                fontSize: "40px",
                border: "transparent",
              }}
            >
              🛒
            </Button>
          </Badge>
        </div>
      </div>
    </>
  );
}

export default Navbar;
