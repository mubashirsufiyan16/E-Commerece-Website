import { Card, Button, Modal, Badge } from "antd";
import { useState } from "react";
import "../App.css";
import products from "../data/Products";

function Product({ setQuantity, quantity = 0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productQuantity, setProductQuantity] = useState(1);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setIsModalOpen(true);
  };

  const MoveToCart = () => {
    const oldCart = JSON.parse(localStorage.getItem("cartProduct")) || [];

    const newProduct = {
      ...selectedProduct,
      quantity: productQuantity,
    };

    oldCart.push(newProduct);

    setQuantity(oldCart.length);

    localStorage.setItem("cartProduct", JSON.stringify(oldCart));

    setIsModalOpen(false);
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
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
            />

            <p>Price: Rs. {product.price}</p>

            <p>Category: {product.category}</p>

            <Button
              style={{
                backgroundColor: "#1677ff",
                color: "white",
                fontSize: "25px",
                fontFamily:"emoji",
                padding:"20px"
              }}
              onClick={() => handleAddToCart(product)}
            >
              Product Details
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        title="Product Added"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cart" type="primary" onClick={MoveToCart}>
            Add To Cart
          </Button>,
        ]}
      >
        {selectedProduct && (
          <>
            <h3>{selectedProduct.title}</h3>

            <p>Price: Rs. {selectedProduct.price}</p>

            <Button
              onClick={() => {
                if (productQuantity > 1) {
                  setProductQuantity(productQuantity - 1);
                }
              }}
            >
              -
            </Button>

            <span style={{ margin: "0 15px" }}>{productQuantity}</span>

            <Button
              onClick={() => setProductQuantity(productQuantity + 1)}
            >
              +
            </Button>

            <h2>
              Total: Rs. {selectedProduct.price * productQuantity}
            </h2>
          </>
        )}
      </Modal>
    </>
  );
}

export default Product;