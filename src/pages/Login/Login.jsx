import { useNavigate } from "react-router-dom";
import{Input} from "antd"

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Login</h2>

        <Input required type="email" placeholder="Enter Email.." />
        <Input type="password" placeholder="Enter Password.."/>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;