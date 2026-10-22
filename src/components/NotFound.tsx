import { Result,Button } from "antd"
import { useNavigate } from "react-router-dom"


function NotFound() {
  const navigate =useNavigate()
  return (
    <div>
       <Result
        status="404"
        title="Product Not Found!"
        extra={[
          <Button
          key="home"
            type="primary"
            onClick={() => navigate("/dashboard")}
          >
            Continue Shopping
          </Button>,
        ]}
      />
    </div>
  )
}

export default NotFound
