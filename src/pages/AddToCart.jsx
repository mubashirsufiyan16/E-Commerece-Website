import { useLocation,useNavigate } from "react-router-dom";
import { Card, Button,Result } from "antd";
import { useState } from "react";

function AddToCart() {
  const navigate=useNavigate()
  const { state } = useLocation();
  const product = state?.product;
  const quantity = state?.quantity || 1;

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartProduct")) || [];
  });

  const moveToDashboard=()=>{
    navigate("/dashboard")
  }
  if (product) {
    const alreadyAdded = cart.some(
      (item) => item.id === product.id
    );

    if (!alreadyAdded) {
      const newCart = [
        ...cart,
        {
          ...product,
          quantity: quantity,
        },
      ];

      localStorage.setItem(
        "cartProduct",
        JSON.stringify(newCart)
      );

      setCart(newCart);
    }
  }

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
  const placeOrder=(product)=>{
    const orderedProduct=JSON.stringify(product)
    localStorage.setItem("ORDEREDPRODUCT",orderedProduct)
    console.log(orderedProduct)
    navigate("/CheckOut")
  }
  const removeItem = (id) => {
    const oldCart =
      JSON.parse(localStorage.getItem("cartProduct")) || [];

    const updatedCart = oldCart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(updatedCart)
    );
  };

  if (cart.length === 0) {
    return(
    <Result
    status="403"
    title="Cart Is Empty!"
       extra={[
        <Button
        key="continue"
          type="primary"
          onClick={() => navigate("/dashboard")}
        >
          Continue Shopping
        </Button>
      ]}
    />
     )
     
    }

  return (
    <>
    <Button onClick={()=>{moveToDashboard()}} style={{
      backgroundColor:"blue",
      color:"white",
      fontSize:"30px",
      fontFamily:"emoji",
      padding:"15px",
      margin:"10px",
      border:"1px solid transparent",
      borderRadius:"15px"
    }}>Back</Button>
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
              width: 350,
              border: "1px solid black",
              justifyContent:"center"
            }}
            
          >
            <p style={{
              fontFamily:"revert",
              fontSize:"22px",
              fontWeight:"700",
              display:"flex",
              textAlign:"center",
              justifyContent:"center",
            }}>{product.title}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                display:"flex",
                borderRadius: "10px",
              }}
            />
          <div style={{
              fontSize:"20px",
              fontWeight:"600",
              color:"black",
              fontFamily:"fangsong",
              justifyContent:"center",
              textAlign:"center"}}>
            <p>Price: Rs. {product.price}</p>

            <p>Category: {product.category}</p>
           

            <Button
              onClick={() => decreaseQuantity(product.id)}
            >
              -
            </Button>

            <span style={{ margin: "0 15px" }}>
              {product.quantity}
            </span>
            <Button
              onClick={() => increaseQuantity(product.id)}
              >
              +
            </Button>
              </div>

            <br />
            <br />
              <div style={{
                display:"flex",
                gap:"20px"
              }}>
            <Button
              onClick={() => removeItem(product.id)}
              style={{
                backgroundColor: "blue",
                color: "white",
                fontSize: "22px",
                marginBottom:"10px",
                fontFamily:"emoji"
              }}
            >
              Remove Item
            </Button>

            <Button
              onClick={() => {placeOrder(product)}}
              
              style={{
                backgroundColor: "blue",
                color: "white",
                fontSize: "22px",
                fontFamily:"emoji"
              }}
            >
              Place Order
            </Button>
        </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default AddToCart;