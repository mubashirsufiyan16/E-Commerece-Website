import { useNavigate } from "react-router-dom";
import { Card, Button, Result } from "antd";
import { useState } from "react";

function AddToCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartProduct")) || [];
  });

  const moveToDashboard = () => {
    navigate("/dashboard");
  };

  const goToCheckout = () => {
    navigate("/CheckOut");
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(updatedCart)
    );
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(updatedCart)
    );
  };

  if (cart.length === 0) {
    return (
      <Result
        status="403"
        title="Cart Is Empty!"
        extra={[
          <Button
            type="primary"
            onClick={() => navigate("/dashboard")}
          >
            Continue Shopping
          </Button>,
        ]}
      />
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Button
          onClick={moveToDashboard}
          style={{
            backgroundColor: "#1677ff",
            color: "white",
            fontSize: "20px",
            padding: "20px",
            border: "1px solid transparent",
            borderRadius: "10px",
          }}
        >
          Back
        </Button>

        <Button
          onClick={goToCheckout}
          style={{
            backgroundColor: "#1677ff",
            color: "white",
            fontSize: "20px",
            padding: "20px",
            border: "1px solid transparent",
            borderRadius: "10px",
          }}
        >
          Checkout
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {cart.map((product, index) => (
          <Card
            key={`${product.id}-${index}`}
            style={{
              width: 400,
              border: "1px solid black",
            }}
          >
            <p
              style={{
                fontFamily: "revert",
                fontSize: "22px",
                fontWeight: "700",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {product.title}
            </p>

            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                display: "flex",
                borderRadius: "10px",
              }}
            />

            <div
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "black",
                fontFamily: "fangsong",
                textAlign: "center",
              }}
            >
              <p>Price: Rs. {product.price}</p>

              <p>Category: {product.category}</p>

              <div>
                <Button
                  onClick={() =>
                    decreaseQuantity(product.id)
                  }
                >
                  -
                </Button>

                <span style={{ margin: "0 15px" }}>
                  {product.quantity}
                </span>

                <Button
                  onClick={() =>
                    increaseQuantity(product.id)
                  }
                >
                  +
                </Button>
              </div>
            </div>

            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() =>
                  removeItem(product.id)
                }
                style={{
                  backgroundColor: "#1677ff",
                  color: "white",
                  fontSize: "18px",
                  padding: "20px",
                }}
              >
                Remove Item
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default AddToCart;