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
    position: "relative",
    margin: 10,
    padding: 0,
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
    margin: 0,
    objectFit: "cover",
  };

  return (
    <>
      {vehicle ? (
        <Card style={cardStyle} className="mx-2" onClick={handleShowModal} id={`car-card-${vehicle.vehicle_id}`}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type.toLowerCase()}/${vehicle.body_type.toLowerCase()}.jpg`}
            alt={`${vehicle.body_type}_image`}
            style={cardImgStyle}
            id={`car-card-img-${vehicle.vehicle_id}`}
          />
          <div style={overlayBorderStyle} id={`car-card-overlay-${vehicle.vehicle_id}`} />
          <Card.Body id={`car-card-body-${vehicle.vehicle_id}`}>
            <Card.Text id={`car-card-text-${vehicle.vehicle_id}`}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </Card.Text>
            <Card.Text id={`car-card-price-${vehicle.vehicle_id}`}>
              {"$" + vehicle.price}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "225px", height: "300px", margin: "10px" }}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/assets/placeholder.jpg`}
            alt="Placeholder"
            style={{ height: "60%", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Text>Loading...</Card.Text>
          </Card.Body>
        </Card>
      )}
      {vehicle && (
        <CarModal
          vehicle={vehicle}
          show={showModal}
          handleClose={handleCloseModal}
          id={`car-modal-${vehicle.vehicle_id}`}
        />
      )}
    </>
  );
};

export default CarCard;
