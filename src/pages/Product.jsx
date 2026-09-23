import { Card, Button, Modal } from "antd";
import { useState } from "react";
import "../App.css";
import products from "../data/Products";
import CheckOut from "./CheckOut";
import { useNavigate } from "react-router-dom";

function Product() {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate=useNavigate()

const handleCheckOut = () => {
  navigate("/checkout", {
    state: {
      product: selectedProduct,
      quantity: quantity,
    },
  });
};
  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <Card
            className="productCard"
            key={product.id}
            title={product.title}
            style={{
            width: 300,
            border: "1px solid black",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%" }}
            />

            <p
              style={{
                fontSize: "25px",
                fontFamily: "fangsong",
              }}
            >
              Price: Rs. {product.price}
            </p>

            <p
              style={{
                fontSize: "25px",
                fontFamily: "fangsong",
                color: "gray",
              }}
            >
              Category: {product.category}
            </p>

            <Button
              onClick={() => handleAddToCart(product)}
              className="buttons"
            >
              Add To Cart
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        title="Product Added"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[

          <Button
            key="cart"
            type="primary"
            onClick={() => handleCheckOut()}
          >
            Check Out
          </Button>,
        ]}
      >
        {selectedProduct && (
          <>
            <h3>{selectedProduct.title}</h3>
            <p>Price: Rs. {selectedProduct.price}</p>
            <p>Product successfully added to your cart.</p>
            <Button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(Number(quantity - 1));
                }
              }}
            >
              -
            </Button>
            <span style={{ margin: "0 15px" }}>{quantity}</span>

            <Button onClick={() => setQuantity( Number(quantity + 1))}>+</Button>
            <h2>Total price: {selectedProduct.price * quantity}</h2> 
          </>
        )}
      </Modal>
    </>
  );
}

export default Product;
