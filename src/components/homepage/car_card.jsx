import React, { useState } from "react";
import { Card } from "react-bootstrap";
import CarModal from './card_modal'

const CarCard = ({ vehicle, highlighted }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const cardStyle = {
    width: "225px",
    height: "300px",
    margin: "0",
    padding: "0",
    position: "relative",
  };

  const overlayBorderStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: highlighted ? "2px solid red" : "none",
    pointerEvents: "none",
    borderRadius: "4px",
  };

  const cardImgStyle = {
    height: "60%",
    width: "100%",
    objectFit: "cover",
  };

  return (
    <>
      <Card style={cardStyle} className="mx-2" onClick={handleShowModal}>
        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type}/${vehicle.body_type}.jpg`}
          alt={`${vehicle.body_type}_image`}
          style={cardImgStyle}
        />
        <div style={overlayBorderStyle} />
        <Card.Body>
          <Card.Text>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Card.Text>
          <Card.Text>{"$" + vehicle.price}</Card.Text>
        </Card.Body>
      </Card>
      <CarModal
        vehicle={vehicle}
        show={showModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default CarCard;
