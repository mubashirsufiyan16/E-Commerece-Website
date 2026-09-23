import {useNavigate } from "react-router-dom"
import { Button } from "antd"
import "../../App.css"
function Navbar() {
  const navigate=useNavigate()

  const handleLogOut=()=>{
    navigate("/login")
  }
  return (
    <>
    <div className="nav">
      <ul>
        <h3>DASHBOARD</h3>
      </ul>
    <div>
        <Button onClick={handleLogOut} 
        id="logoutbtn">Logout</Button>
        </div>
    </div>
        </>
  )
}

export default Navbar
