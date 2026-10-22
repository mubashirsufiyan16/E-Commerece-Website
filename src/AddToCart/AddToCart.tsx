import { useNavigate } from "react-router-dom";
import { Card, Button, Result } from "antd";
import { useState } from "react";
import "../AddToCart/addToCart.css"

interface CartProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
}

function AddToCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartProduct[]>(() => {
  return JSON.parse(
    localStorage.getItem("cartProduct") || "[]"
  );
});

  const updateCart = (updatedCart: CartProduct[]) => {
    setCart(updatedCart);
    localStorage.setItem("cartProduct", JSON.stringify(updatedCart));
  };

  const moveToDashboard = () => {
    navigate("/dashboard");
  };

  const goToCheckout = () => {
    navigate("/CheckOut");
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  if (cart.length === 0) {
    return (
      <Result
        status="403"
        title="Cart Is Empty!"
        extra={[
          <Button
            key="shopping"
            type="primary"
            onClick={moveToDashboard}
          >
            Continue Shopping
          </Button>,
        ]}
      />
    );
  }

  return (
    <>
      <div className="div-container"
      >
        <button className="add-to-cart-Btn"
          onClick={moveToDashboard}
         
        >
          Back
        </button>

        <button className="add-to-cart-Btn"
          onClick={goToCheckout}
          
        >
          Checkout
        </button>
      </div>

      <div className="cart-div"
      >
        {cart.map((product, index) => (
          <Card className="cart-product"
            key={`${product.id}-${index}`}
          >
            <p

            >
              {product.title}
            </p>

            <img
              src={product.image}
              alt={product.title}
            />

            <div className="card-bottom"
            >
              <p>Price: Rs. {product.price}</p>
              <p>Category: {product.category}</p>

                <Button
                  onClick={() => decreaseQuantity(product.id)}
                  >
                  -
                </Button>

                <span >
                  {product.quantity}
                </span>

                <Button
                  onClick={() => increaseQuantity(product.id)}
                  >
                  +
                </Button>
                  <div>
              </div>
            </div>

            <br />

            <div className="remove-btn"
            >
              <button
                onClick={() => removeItem(product.id)}
                style={{
                  
                }}
              >
                Remove Item
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default AddToCart;
