import { Card, Button,Modal,Input,Form } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();
  const navigate=useNavigate()
    const handleOrder=()=>{
      navigate("/Order")
    }
  const product = state.product;
  const quantity = state.quantity;

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  }
  return (
    <div style={{ padding: "40px",
        display:"flex",
        justifyContent:"center"
     }}>
      <Card title="Order Summary" style={{ width: "400px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
          }}
        />

        <h2>{product.title}</h2>

        <p>Price: Rs. {product.price}</p>

        <p>Quantity: {quantity}</p>

        <h2>Total: Rs. {product.price * quantity}</h2>

        <Button type="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Card>
      <Modal
        title="User Information"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form>
          <Input style={{margin:"10px"}} type="text" placeholder="Full Name" required />
          <br />
          <Input style={{margin:"10px"}}  type="email" placeholder="Email" required />
          <br />
          <Input style={{margin:"10px"}}  type="number" placeholder="Phone" required />
          <br />
          <Input.TextArea style={{margin:"10px"}}  placeholder="Address" required />
          <br />
          <Button onClick={handleOrder}
        style={{display:"flex",justifyContent:"center"}}
        type="primary"
        >Confirm Order</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default CheckOut;
