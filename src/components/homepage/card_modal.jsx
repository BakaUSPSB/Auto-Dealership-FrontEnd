import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import negotiationService from "../../services/negotiationService";

const CarModal = ({ vehicle, show, handleClose }) => {
  const [offerPrice, setOfferPrice] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmitOffer = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle redirection to login page or show login modal
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
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type}/${vehicle.body_type}.jpg`}
          alt={`${vehicle.body_type}_image`}
          style={{ height: "60%", width: "100%", objectFit: "cover" }}
        />
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
  );
};

export default CarModal;
