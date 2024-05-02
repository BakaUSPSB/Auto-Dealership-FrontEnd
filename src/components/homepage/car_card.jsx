import React, { useState } from "react";
import { Card, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import negotiationService from "../../services/negotiationService";

const CarCard = ({ vehicle, highlighted }) => {
  // Initialize body_type state
    vehicle = vehicle || {
    body_type: "",
    year: "",
    make: "",
    model: "",
    price: "",
    transmission: "",
    color: "",
    miles: "",
    mpg: "",
    fuel_type: "",
  };
  const [offerPrice, setOfferPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmitOffer = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const response = await negotiationService.negotiation(
      vehicle.vehicle_id,
      offerPrice,
      msg
    );
    if (response.code === 201) {
      alert("Offer submitted successfully");
    }
    // Submit the offer...
  };
  // Ensure body_type is set once

  // Image source
  const imageSrc = `${process.env.PUBLIC_URL}/cars/${vehicle.body_type}/${vehicle.body_type}.jpg`;

  // Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Card style
  const cardStyle = {
    width: "225px",
    height: "300px",
    margin: "0",
    padding: "0",
    position: "relative", // Added relative positioning
  };

  // Overlay border style
  const overlayBorderStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: highlighted ? "2px solid red" : "none", // Conditional border
    pointerEvents: "none", // Ensure clicks pass through the overlay
    borderRadius: "4px", // Adjust border radius if needed
  };

  // Card image style
  const cardImgStyle = {
    height: "60%",
    width: "100%",
    objectFit: "cover",
  };

  return (
    <>
      <Card style={cardStyle} className="mx-2" onClick={handleShow}>
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={`${vehicle.body_type}_image`}
          style={cardImgStyle}
        />
        {/* Overlay border */}
        <div style={overlayBorderStyle} />
        <Card.Body>
          <Card.Text>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Card.Text>
          <Card.Text>{"$" + vehicle.price}</Card.Text>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imageSrc} alt={`${vehicle.body_type}_image`} style={cardImgStyle} />
          <div>
            <p>
              {vehicle.make} {vehicle.model}
            </p>
            <p>Body Type: {vehicle.body_type}</p>
            <p>Color: {vehicle.color}</p>
            <p>Year: {vehicle.year}</p>
            <p>${vehicle.price}</p>
            <p>Transmission: {vehicle.transmission}</p>
            <p>Miles: {vehicle.miles}</p>
            <p>MPG: {vehicle.mpg}</p>
            <Row>
              <Col>
                <Form.Control
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="Offer Price"
                />
              </Col>
              <Col>
                <Form.Control
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Message"
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitOffer}>
            Submit Offer
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarCard;
