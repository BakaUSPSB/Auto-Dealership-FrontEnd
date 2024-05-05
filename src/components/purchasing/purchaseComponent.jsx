import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import CarDetails from "../display/car_details"; // Import CarDetails component

const PurchaseComponent = ({ vehicle, handlePayment }) => {
    const [routingNumber, setRoutingNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState("");
    const [error, setError] = useState("");

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
            <Row>
                <Col className="bank-details">
                    <h2>Bank Information</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="routingNumber">
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

                        <Form.Group controlId="accountNumber">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Enter account number"
                                isInvalid={!!error && !accountNumber}
                            />
                        </Form.Group>

                        <Form.Group controlId="accountType">
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

                        <Button type="submit" variant="primary">
                            Purchase
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <img
                        src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type}/${vehicle.body_type}.jpg`}
                        alt={`${process.env.PUBLIC_URL}/cars/placeholder/placeholder.jpg`}
                        id="carImage"
                        style={{ maxWidth: "25%" }} // Set max width to 25%
                    />
                    <CarDetails vehicle={vehicle} /> {/* Render CarDetails component */}
                </Col>
            </Row>
        </Container>
    );
};

export default PurchaseComponent;
