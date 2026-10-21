import { useNavigate } from "react-router-dom";
import { Input, Form, Button } from "antd";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Login Page</h2>
        <Form onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "email is required",
              },
            ]}
          >
            <Input required type="email" placeholder="Enter Email.." />
          </Form.Item>
          <Form.Item
          name="password"
          rules={[
            {
              required:true,
              message:"Password is required"
            }
          ]}
          >
          <Input type="password" placeholder="Enter Password.." />
          </Form.Item>
        <Button style={{
          padding:"30px",
          fontSize:"24px",
          fontFamily:"math"
          
        }} type="primary" htmlType="submit">
          Login 
        </Button>
          </Form>
      </div>
    </div>
  );
}

export default Login;
