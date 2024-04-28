import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";

const CarCard = ({ vehicle, highlighted }) => {
  // Initialize bodyType state
  const [bodyType, setBodyType] = useState(null);

  // Ensure bodyType is set once
  if (!bodyType) {
    const bodyTypes = ["sedan", "coupe", "suv", "hatchback", "pickup"];
    const randomBodyType =
      bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
    setBodyType(randomBodyType);
  }

  // Image source
  const imageSrc = `${process.env.PUBLIC_URL}/cars/${bodyType}/${bodyType}.jpg`;

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
          alt={`${bodyType}_image`}
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
          <img src={imageSrc} alt={`${bodyType}_image`} style={cardImgStyle} />
          <div>
            <p>
              {vehicle.make} {vehicle.model}
            </p>
            <p>Color: {vehicle.color}</p>
            <p>Year: {vehicle.year}</p>
            <p>${vehicle.price}</p>
            <p>Transmission: {vehicle.transmission}</p>
            <p>Miles: {vehicle.miles}</p>
            <p>MPG: {vehicle.mpg}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarCard;
