import { Button, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const navigate = useNavigate();

  const orderedProduct = JSON.parse(localStorage.getItem("ORDEREDPRODUCT"));

  const moveToOrder = () => {
    navigate("/Order");
  };

  return (
    <>
      <h1
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          textTransform: "uppercase",
          fontFamily: "math",
          fontSize: "50px",
          fontWeight: "1000",
        }}
      >
        Check Out Page
      </h1>

      <div
        style={{
          padding: "30px",
        }}
      >
        {orderedProduct && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "30px",
            }}
          >
            <div
              style={{
                width: "30%",
                flexShrink: 0,
                fontSize: "20px",
              }}
            >
              <img
                src={orderedProduct.image}
                alt={orderedProduct.title}
                style={{
                  width: "70%",
                  borderRadius: "10px",
                  display: "block",
                }}
              />

              <h2
                style={{
                  fontSize: "35px",
                  marginTop: "20px",
                }}
              >
                {orderedProduct.title}
              </h2>

              <p>Price: Rs. {orderedProduct.price}</p>

              <p>Category: {orderedProduct.category}</p>

              <p>Quantity: {orderedProduct.quantity}</p>

              <h2>
                Total: Rs. {orderedProduct.price * orderedProduct.quantity}
              </h2>
            </div>

            <Form
              style={{
                flex: 1,
                backgroundColor: "white",
                padding: "20px",
                marginTop: "50px",
                fontSize: "20px",
                paddingBottom: "40px",
                boxShadow: "10px 10px 40px black",
                borderRadius: "10px",
                boxSizing: "border-box",
              }}
            >
              <h3
                style={{
                  fontFamily: "fantasy",
                  fontSize: "40px",
                  margin: "0 0 20px 0",
                  textAlign: "center",
                }}
              >
                User Information
              </h3>

              <Input placeholder="First Name" />
              <br />
              <br />

              <Input placeholder="Last Name" />
              <br />
              <br />

              <Input placeholder="Address" />
              <br />
              <br />

              <Input placeholder="City" />
              <br />
              <br />

              <Input placeholder="Phone" />
              <br />
              <br />

              <Button
                type="primary"
                onClick={moveToOrder}
                style={{
                  width: "100%",
                  padding: "25px",
                  fontSize: "30px",
                }}
              >
                Confirm Order
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckOut;
