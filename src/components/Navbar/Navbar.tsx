import { useNavigate } from "react-router-dom";
import { Button, Badge } from "antd";
import { useEffect, useState } from "react";
import "../../App.css";

interface CartProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
}
interface NavbarProps {
  quantity: number;
}
function Navbar({quantity} :NavbarProps) {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartProduct[]>(() => {
    return JSON.parse(localStorage.getItem("cartProduct") || "[]");
  });

  const [badgeValue, setBadgeValue] = useState<number>(0);

  useEffect(() => {
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setBadgeValue(totalQuantity);
  }, [cart]);

  useEffect(() => {
    const updateCart = () => {
      setCart(JSON.parse(localStorage.getItem("cartProduct") || "[]"));
    };

    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const handleLogOut = () => {
    navigate("/login");
  };

  const handleCart = () => {
    navigate("/AddToCart");
  };

  return (
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
  );
}

export default Navbar;
