import { Button, Input, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckOut() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartProduct")) || [];
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const shipping = 199;

  // Cart ka total price
  const subtotal = cart.reduce((total, product) => {
    const productTotal = product.price * product.quantity;
    return total + productTotal;
  }, 0);

  const totalPrice = subtotal + shipping;

  // Input ki value state mein save karna
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName === "") {
      newErrors.firstName = "First Name is required";
    }

    if (formData.lastName === "") {
      newErrors.lastName = "Last Name is required";
    }

    if (formData.address === "") {
      newErrors.address = "Address is required";
    }

    if (formData.city === "") {
      newErrors.city = "City is required";
    }

    if (formData.phone === "") {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    return true;
  };

  // Confirm Order
  const confirmOrder = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const orderData = {
      user: formData,
      products: cart,
      subtotal: subtotal,
      shipping: shipping,
      totalPrice: totalPrice,
    };

    localStorage.setItem(
      "ORDEREDPRODUCT",
      JSON.stringify(orderData)
    );

    localStorage.removeItem("cartProduct");

    setCart([]);

    navigate("/Order");
  };

  // Cart empty
  if (cart.length === 0) {
    return (
      <Result
        status="404"
        title="Cart Is Empty!"
        subTitle="There are no products available for checkout."
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/dashboard")}
          >
            Continue Shopping
          </Button>
        }
      />
    );
  }

  return (
    <>
      {/* Navbar */}

      <nav
        style={{
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
          fontFamily: "math",
          fontSize: "50px",
          fontWeight: "1000",
          margin: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Button
          onClick={() => navigate("/AddToCart")}
          type="primary"
          style={{
            height: "50px",
            padding: "0 25px",
            fontSize: "20px",
            borderRadius: "10px",
            textTransform: "uppercase",
          }}
        >
          Back
        </Button>

        <div
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          Check Out Page
        </div>
      </nav>

      {/* Main Container */}

      <div
        style={{
          padding: "30px 50px 50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "35px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* User Information */}

          <form
            onSubmit={confirmOrder}
            style={{
              flex: 1,
              backgroundColor: "white",
              margin:"20px",
              padding: "30px",
              fontSize: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
              borderRadius: "15px",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontFamily: "fantasy",
                fontSize: "40px",
                margin: "0 0 30px 0",
                textAlign: "center",
              }}
            >
              User Information
            </h3>

            {/* First Name + Last Name */}

            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  size="large"
                  placeholder="First Name"
                  style={{
                    marginBottom: "5px",
                  }}
                />

                {errors.firstName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      margin: "0 0 10px",
                    }}
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  size="large"
                  placeholder="Last Name"
                  style={{
                    marginBottom: "5px",
                  }}
                />

                {errors.lastName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      margin: "0 0 10px",
                    }}
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}

            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              size="large"
              placeholder="Address"
              style={{
                marginBottom: "5px",
              }}
            />

            {errors.address && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  margin: "0 0 10px",
                }}
              >
                {errors.address}
              </p>
            )}

            {/* Apartment */}

            <Input
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              size="large"
              placeholder="Apartment, suit, etc. (optional)"
              style={{
                marginBottom: "15px",
              }}
            />

            {/* City + Postal Code */}

            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  size="large"
                  placeholder="City"
                  style={{
                    marginBottom: "5px",
                  }}
                />

                {errors.city && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      margin: "0 0 10px",
                    }}
                  >
                    {errors.city}
                  </p>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <Input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  size="large"
                  placeholder="Postal Code (optional)"
                  style={{
                    marginBottom: "15px",
                  }}
                />
              </div>
            </div>

            {/* Phone */}

            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              size="large"
              placeholder="Phone"
              style={{
                marginBottom: "5px",
              }}
            />

            {errors.phone && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  margin: "0 0 10px",
                }}
              >
                {errors.phone}
              </p>
            )}

            {/* Confirm Order */}

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
                height: "55px",
                fontSize: "25px",
                fontWeight: "bold",
                fontFamily: "math",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              Confirm Order
            </Button>
          </form>

          {/* Order Summary */}

          <div
            style={{
              width: "450px",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                margin: "0 0 25px",
                fontSize: "28px",
                fontFamily: "fangsong",
                fontWeight: "1000",
                textTransform: "uppercase",
                borderBottom: "1px solid lightgray",
                paddingBottom: "15px",
              }}
            >
              Order Summary
            </h2>

            {/* Products */}

            {cart.map((product) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px 0",
                  borderBottom: "1px solid lightgray",
                }}
              >
                <div
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "75px",
                      height: "75px",
                      objectFit: "contain",
                      borderRadius: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 6px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.title}
                  </p>

                  <p
                    style={{
                      color: "gray",
                      fontFamily: "math",
                      fontWeight: "500",
                      fontSize: "17px",
                      margin: "5px 0",
                    }}
                  >
                    Quantity: {product.quantity}
                  </p>

                  <p
                    style={{
                      color: "gray",
                      fontSize: "15px",
                      margin: "5px 0",
                    }}
                  >
                    Price: Rs. {product.price.toLocaleString()}
                  </p>
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Rs.{" "}
                  {(
                    product.price * product.quantity
                  ).toLocaleString()}
                </div>
              </div>
            ))}

            {/* Cost Summary */}

            <div
              style={{
                borderTop: "1px solid lightgray",
                marginTop: "25px",
                paddingTop: "20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Cost Summary
              </h3>

              <p
                style={{
                  margin: "12px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                }}
              >
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </p>

              <p
                style={{
                  margin: "12px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                }}
              >
                <span>Shipping:</span>
                <span>Rs. {shipping.toFixed(2)}</span>
              </p>

              {/* Total */}

              <div
                style={{
                  borderTop: "1px solid lightgray",
                  marginTop: "20px",
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "38px",
                    fontWeight: "1000",
                    fontFamily: "fangsong",
                  }}
                >
                  Total
                </span>

                <span
                  style={{
                    fontSize: "25px",
                    fontWeight: "700",
                  }}
                >
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;