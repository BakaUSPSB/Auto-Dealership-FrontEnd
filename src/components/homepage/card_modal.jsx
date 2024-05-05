import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import negotiationService from "../../services/negotiationService";
import CarDetails from "../display/car_details"; // Import CarDetails component

const CarModal = ({ vehicle, show, handleClose }) => {
  const [offerPrice, setOfferPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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

  const handleBuyNow = () => {
    // Save the vehicle data in local storage as checkoutVehicle
    //localStorage.setItem("checkoutVehicle", JSON.stringify(vehicle));
    //navigate({ pathname: "/purchase", state: { vehicle }});
    navigate(`/purchase/${vehicle.vehicle_id}`); // Replace vehicleId with the actual vehicle ID you want to pass

    //console.log(localStorage.getItem("checkoutVehicle"))
  };

  const isOfferPriceEntered = offerPrice.trim() !== ""; // Check if offer price is entered

  return (
    <>
      <style>{`
        .custom-modal {
          max-width: 75% !important; /* Set the maximum width of the modal to 75% of the viewport */
        }
      `}</style>

      <Modal
        show={show}
        onHide={handleClose} // Close modal if user clicks outside
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="carModalTitle">Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type}/${vehicle.body_type}.jpg`}
                alt={`${vehicle.body_type}_image`}
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                id="carImage"
              />
            </Col>
            <Col md={6}>
              <CarDetails vehicle={vehicle} /> {/* Render CarDetails component */}
              <Form>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="Enter An Offer Price"
                      id="offerPriceInput"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Message (Optional)"
                      id="messageInput"
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {isOfferPriceEntered && ( // Only render if offer price is entered
            <Button variant="primary" onClick={handleSubmitOffer} id="submitOfferButton">
              Submit Offer
            </Button>
          )}
          <Button variant="primary" onClick={handleBuyNow} id="buyNowButton">
            Buy Now
          </Button>
          <Button variant="secondary" onClick={handleClose} id="closeButton">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarModal;
