import { Card, Button, Modal } from "antd";
import { useState } from "react";
import "../product/product.css";
import products from "../../data/Products";

interface ProductType {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

interface CartProduct extends ProductType {
  quantity: number;
}

interface ProductProps {
  product?: ProductType[];
  quantity?: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

function Product({ product = products,setQuantity }: ProductProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const handleAddToCart = (product: ProductType) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setIsModalOpen(true);
  };

  const moveToCart = () => {
    if (!selectedProduct) return;

    const oldCart: CartProduct[] = JSON.parse(
      localStorage.getItem("cartProduct") || "[]"
    );

    const existingProduct = oldCart.find(
      (item) => item.id === selectedProduct.id
    );

    let updatedCart: CartProduct[];

    if (existingProduct) {
      updatedCart = oldCart.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + productQuantity }
          : item
      );
    } else {
      const newProduct: CartProduct = {
        ...selectedProduct,
        quantity: productQuantity,
      };

      updatedCart = [...oldCart, newProduct];
    }

    localStorage.setItem("cartProduct", JSON.stringify(updatedCart));

    setQuantity?.(
      updatedCart.reduce((total, item) => total + item.quantity, 0)
    );

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="product-div"
      >
        {product.map((item: ProductType) => (
          <Card className="product-card"
            key={item.id}
            title={item.title}
          >
            <img className="product-img"
              src={item.image}
              alt={item.title}
            />
            <p>Price: Rs. {item.price}</p>
            <p>Category: {item.category}</p>

            <button className="product-btn"
              onClick={() => handleAddToCart(item)}
            >
              Product Details
            </button>
          </Card>
        ))}
      </div>

      <Modal
        title="Product Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cart" type="primary" onClick={moveToCart}>
            Add To Cart
          </Button>,
        ]}
      >
        {selectedProduct && (
          <>
            <h3>{selectedProduct.title}</h3>
            <p>Price: Rs. {selectedProduct.price}</p>

            <Button
              onClick={() =>
                setProductQuantity((prev) => Math.max(1, prev - 1))
              }
            >
              -
            </Button>

            <span  style={{ margin: "0 15px" }}>{productQuantity}</span>

            <Button onClick={() => setProductQuantity((prev) => prev + 1)}>
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
