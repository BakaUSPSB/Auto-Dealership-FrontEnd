import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import CarDetails from "../display/car_details";
import PurchasingService from "../../services/purchasingService";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  border: 2px solid #8a00ff;
  border-radius: 8px;
  background-color: lightgray;
  padding: 20px;
`;

const PurchaseComponent = ({ vehicle }) => {
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [error, setError] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const validateForm = () => {
    if (routingNumber.length !== 9) {
      setError("Routing number must be 9 digits long.");
      return false;
    }
    if (accountNumber.length === 0) {
      setError("Account number is required.");
      return false;
    }
    if (!accountType) {
      setError("Please select an account type.");
      return false;
    }
    setError("");
    return true;
  };

  const handlePayment = async ({ routingNumber, accountNumber }) => {
    try {
      const purchaseId = localStorage.getItem("purchase__id");
      const response = await PurchasingService.payment(
        purchaseId,
        accountNumber,
        routingNumber
      );
      if (response && response.success) {
        setPurchaseSuccess(true);
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setError("Payment failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handlePayment({
        routingNumber,
        accountNumber,
        accountType,
      });
    }
  };

  return (
    <Container className="purchase-page-container">
      <Row className="my-4">
        <Col md={6}>
          <StyledContainer>
            <h2>Bank Information</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="routing-number">
                <Form.Label>Routing Number</Form.Label>
                <Form.Control
                  type="text"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  placeholder="Enter routing number"
                  maxLength="9"
                  isInvalid={!!error && routingNumber.length !== 9}
                />
              </Form.Group>

              <Form.Group controlId="account-number">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  isInvalid={!!error && !accountNumber}
                />
              </Form.Group>

              <Form.Group controlId="account-type">
                <Form.Label>Account Type</Form.Label>
                <Form.Control
                  as="select"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  isInvalid={!!error && !accountType}
                >
                  <option value="">Select account type</option>
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </Form.Control>
              </Form.Group>

              {error && <div className="text-danger">{error}</div>}
              {purchaseSuccess && (
                <div className="text-success">Purchase successful!</div>
              )}

              <Button type="submit" variant="primary" className="mt-3">
                Purchase
              </Button>
            </Form>
          </StyledContainer>
        </Col>

        <Col md={6}>
          <StyledContainer>
            <Image
              src={`${
                process.env.PUBLIC_URL
              }/cars/${vehicle.body_type.toLowerCase()}/${vehicle.body_type.toLowerCase()}.jpg`}
              style={{
                width: "100%",
                objectFit: "contain",
              }}
              alt={`${vehicle.body_type}`}
            />
            <CarDetails vehicle={vehicle} />
          </StyledContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseComponent;
