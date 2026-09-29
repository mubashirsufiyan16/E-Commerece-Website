import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Order() {

  const navigate = useNavigate();

  return (
    <div>
    <Result
      status="success"
      title="Order Placed Successfully!"
      subTitle="Thank you for your order. Your order has been confirmed."
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
      
      </div>
  );
}

export default Order;