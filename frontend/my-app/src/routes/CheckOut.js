import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../routes/AuthContext";
import { useCart } from "../Components/CartContext";
import "../Components/checkout.css";
import { SiGrab, SiShopee } from "react-icons/si";

function FormExample() {
  const { address, email, phoneNumber } = useContext(AuthContext);
  const { getTotalPrice } = useCart();
  const [deliveryCost, setDeliveryCost] = useState(2.9);
  const [selectedPayment, setSelectedPayment] = useState("");

  const schema = yup.object().shape({
    address: yup.string().required("Address is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    file: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      ),
    terms: yup.bool().required().oneOf([true], "You must accept the terms"),
    delivery: yup.string().required("Please select a delivery option"),
    payment: yup.string().required("Please select a payment option"),
  });

  const handleDeliveryChange = (event) => {
    const selectedOption = event.target.value;
    const cost = selectedOption === "normal" ? 2.9 : 5.9;
    setDeliveryCost(cost);
  };

  const handlePaymentClick = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  return (
    <div className="form-container overflow-scroll">
      <div className="navigation-links">
        <Link to="/cart">
          <Button variant="secondary" className="back-to-cart-button">
            Back to Cart
          </Button>
        </Link>
        <Link to="/">
          <Button variant="secondary" className="back-to-home-button">
            Back to Home
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="secondary" className="profile-button">
            Go to Profile
          </Button>
        </Link>
      </div>
      <h3 className="checkout-header">CheckOut</h3>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={{
          address: address || "",
          city: "",
          state: "",
          email: email || "",
          phone: phoneNumber || "",
          file: null,
          terms: false,
          delivery: "normal",
          payment: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="custom-form">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="12"
                controlId="validationFormik104"
                className="position-relative"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address && touched.address}
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormik107"
                className="position-relative mb-3"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email && touched.email}
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormik108"
                className="position-relative mb-3"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone && touched.phone}
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Delivery Options */}
            <Form.Group className="delivery-options mt-5 mb-3">
              <Form.Label>Delivery Option</Form.Label>
              <div className="delivery-options-container">
                <Form.Check
                  type="radio"
                  id="normalDelivery"
                  name="delivery"
                  label={`Normal Delivery - $2.9`}
                  value="normal"
                  checked={values.delivery === "normal"}
                  onChange={(event) => {
                    handleChange(event);
                    handleDeliveryChange(event);
                  }}
                />
                <Form.Check
                  type="radio"
                  id="expressDelivery"
                  name="delivery"
                  label={`Express Delivery - $5.9`}
                  value="express"
                  checked={values.delivery === "express"}
                  onChange={(event) => {
                    handleChange(event);
                    handleDeliveryChange(event);
                  }}
                />
                {touched.delivery && errors.delivery && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.delivery}
                  </Form.Control.Feedback>
                )}
                <div className="total-expenditure">
                  Total Expenditure: $
                  {(getTotalPrice() + deliveryCost).toFixed(2)}
                </div>
              </div>
            </Form.Group>

            {/* Payment Options */}
            <Form.Group className="payment-options mt-5 mb-3">
              <Form.Label>Payment Option</Form.Label>
              <div className="payment-buttons-container">
                <Button
                  type="button"
                  className={`payment-button grabpay-button ${
                    selectedPayment === "grabpay" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentClick("grabpay")}
                >
                  <SiGrab style={{ marginRight: "8px", fontSize: "45px" }} />{" "}
                  GrabPay
                </Button>
                <Button
                  type="button"
                  className={`payment-button paynow-button ${
                    selectedPayment === "paynow" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentClick("paynow")}
                  style={{
                    backgroundImage:
                      'url("https://logowik.com/content/uploads/images/paynow3339.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "90px",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition:
                      "background-color 0.3s ease, transform 0.2s ease",
                  }}
                >
                  {/* Optional: Add text or an icon if needed */}
                </Button>
                <Button
                  type="button"
                  className={`payment-button shopee-button ${
                    selectedPayment === "shopeepay" ? "active" : ""
                  }`}
                  onClick={() => handlePaymentClick("shopeepay")}
                >
                  <SiShopee style={{ marginRight: "8px", fontSize: "45px" }} />{" "}
                  ShopeePay
                </Button>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.payment}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            {/* Conditional Link for Missing Information */}
            {(address === null ||
              address === "" ||
              phoneNumber === null ||
              phoneNumber === "") && (
              <div className="missing-info-link mt-3">
                <Link to="/update-info">
                  <Button variant="warning">Fill Up Your Information</Button>
                </Link>
              </div>
            )}

            <Form.Group className="terms-box mt-5 mb-3">
              <div className="terms-content">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms && touched.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik109"
                  feedbackTooltip
                />
              </div>
            </Form.Group>
            <Form.Group className="position-relative mb-6 mt-5">
              <Form.Label>
                File - Please Submit Your Screenshot of your bank transaction
              </Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                isInvalid={!!errors.file && touched.file}
                className="custom-input"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.file}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="custom-submit-button">
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormExample;
