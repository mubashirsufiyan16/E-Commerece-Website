import { Button, Input, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../CheckOut/CheckOut.css"

function CheckOut() {
  const navigate = useNavigate();
   interface CartProduct {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
  }
  interface formData{
    firstName:string,
    lastName:string,
    address:string,
    city:string,
    postalCode:string,
    phone:number
  }

const [cart, setCart] = useState<CartProduct[]>(() => {
  return JSON.parse(localStorage.getItem("cartProduct") || "[]");
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

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const shipping = 199;

  // Cart ka total price
  const subtotal = cart.reduce((total, product) => {
    const productTotal = product.price * product.quantity;
    return total + productTotal;
  }, 0);

  const totalPrice = subtotal + shipping;

  // Input ki value state mein save karna
  const handleChange = (e:any) :void => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () :string | boolean => {
    const newErrors = {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    };

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

    if (Object.keys(newErrors).length > 0)  {
      return  false;
    }

    return true;
  };

  // Confirm Order
  const confirmOrder = (e:any)  => {
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

      <nav className="checkout-nav"
      >
        <Button
          onClick={() => navigate("/AddToCart")}
          type="primary"
        >
          Back
        </Button>

        <div
        >
          Check Out Page
        </div>
      </nav>

      {/* Main Container */}

      <div
      >
        <div className="hero-div"
        >
          {/* User Information */}

          <form className="user-form"
            onSubmit={confirmOrder}
          >
            <h3
            >
              User Information
            </h3>

            {/* First Name + Last Name */}

            <div className="input-gap"
            >
              <div>
                <Input className="input"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  size="large"
                  placeholder="First Name"
                 
                />

                {errors.firstName && (
                  <p
                  >
                    {errors.firstName}
                  </p>
                )}
                </div>
              <div>
                <Input className="input"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  size="large"
                  placeholder="Last Name"
                />

                {errors.lastName && (
                  <p
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}

            <Input className="input"
              name="address"
              value={formData.address}
              onChange={handleChange}
              size="large"
              placeholder="Address"
              
            />

            {errors.address && (
              <p
               
              >
                {errors.address}
              </p>
            )}

            {/* Apartment */}

            <Input className="input"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              size="large"
              placeholder="Apartment, suit, etc. (optional)"
            />

            {/* City + Postal Code */}

            <div className="input-gap"
            >
              <div>
                <Input className="input"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  size="large"
                  placeholder="City"
                />

                {errors.city && (
                  <p
                  >
                    {errors.city}
                  </p>
                )}
              </div>

              <div >
                <Input className="input"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  size="large"
                  placeholder="Postal Code (optional)"
                
                />
              </div>
            </div>

            {/* Phone */}

            <Input className="input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              size="large"
              placeholder="Phone"
              
            />

            {errors.phone && (
              <p
              >
                {errors.phone}
              </p>
            )}

            {/* Confirm Order */}

            <Button className="confirm-btn"
              type="primary"
              htmlType="submit"
              size="large"
              onClick={() => navigate("/Order")}
              style={{
               
              }}
            >
              Confirm Order
            </Button>
          </form>

          {/* Order Summary */}

          <div className="order-summary"
            
          >
            <h2
              
            >
              Order Summary
            </h2>

            {/* Products */}

            {cart.map((product) => (
              <div className="product"
                key={product.id}
              
              >
                <div
                >
                  <img className="summary-img"
                    src={product.image}
                    alt={product.title}
                    
                  />
                </div>

                <div className="summary-details"
                  
                >
                  <p>
                    {product.title}
                  </p>

                  <p
                  >
                    Quantity: {product.quantity}
                  </p>

                  <p>
                    Price: Rs. {product.price.toLocaleString()}
                  </p>
                </div>

                <div className="rs-div"
                >
                  Rs.{" "}
                  {(
                    product.price * product.quantity
                  ).toLocaleString()}
                </div>
              </div>
            ))}

            {/* Cost Summary */}

            <div className="cost-summary"
            >
              <h3
               
              >
                Cost Summary
              </h3>

              <p>
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </p>

              <p>
                <span>Shipping:</span>
                <span>Rs. {shipping.toFixed(2)}</span>
              </p>

              {/* Total */}

              <div className="total-cost"
              
              >
                <span className="span-total">
                  Total
                </span>

                <span className="amount-span">
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