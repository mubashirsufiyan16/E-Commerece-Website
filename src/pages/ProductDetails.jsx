import { Button, Card, Modal,Result } from "antd";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../data/Products";
import AddToCart from "./AddToCart";


function ProductDetails() {
  const { id } = useParams();
  const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity,setQuantity]=useState(1)

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const handlePageChange=()=>{
    navigate("/AddToCart")
  }

  if (!product) {
    return <Result style={{
      fontSize:"40px",
      fontFamily:"-moz-initial",
      justifyContent:"center",
      textAlign:"center",
    }}
    status="error"
    >Product Not Found
    </Result>
  }

  return (
    <div className="product-detail">

      <Card className="detail-card">

        <img
          src={product.image}
          alt={product.title}
          className="detail-image"
        />

        <div className="detail-info">

          <h1>{product.title}</h1>
          

          <p>Price: Rs. {product.price}</p>

          <p>Category: {product.category}</p>

          <Button
            type="primary"
            onClick={() => {handlePageChange}}
          >
            Add To Cart
          </Button>
          <AddToCart/>
          <Modal
  title="Product Added"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
>
  <p>{product.title}</p>

  <Button
    onClick={() => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }}
  >
    -
  </Button>

  <span style={{ margin: "0 15px" }}>
    {quantity}
  </span>

  <Button onClick={() => setQuantity(quantity + 1)}>
    +
  </Button>

</Modal>

        </div>

      </Card>
    

    </div>
  );
}

export default ProductDetails;