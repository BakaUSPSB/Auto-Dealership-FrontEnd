import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
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

  const isOfferPriceEntered = offerPrice.trim() !== ""; // Check if offer price is entered

  return (
    <>
      <style>{`
        .custom-modal {
          max-width: 75% !important; /* Set the maximum width of the modal to 75% of the viewport */
        }

        #carModalTitle {
          /* Add custom styles for modal title */
        }

        #carImage {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }

        #makeLabel, #modelLabel, #bodyTypeLabel, #colorLabel, #yearLabel,
        #priceLabel, #transmissionLabel, #milesLabel, #mpgLabel, #fuelLabel {
          font-weight: bold;
        }

        #makeValue, #modelValue, #bodyTypeValue, #colorValue, #yearValue,
        #priceValue, #transmissionValue, #milesValue, #mpgValue, #fuelValue {
          /* Add custom styles for table values */
        }

        #offerPriceInput, #messageInput {
          /* Add custom styles for form inputs */
        }

        #submitOfferButton, #closeButton {
          /* Add custom styles for buttons */
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
              <Table bordered>
                <tbody>
                  <tr>
                    <td id="makeLabel">Make</td>
                    <td id="makeValue">{vehicle.make}</td>
                  </tr>
                  <tr>
                    <td id="modelLabel">Model</td>
                    <td id="modelValue">{vehicle.model}</td>
                  </tr>
                  <tr>
                    <td id="bodyTypeLabel">Body Type</td>
                    <td id="bodyTypeValue">{vehicle.body_type}</td>
                  </tr>
                  <tr>
                    <td id="colorLabel">Color</td>
                    <td id="colorValue">{vehicle.color}</td>
                  </tr>
                  <tr>
                    <td id="yearLabel">Year</td>
                    <td id="yearValue">{vehicle.year}</td>
                  </tr>
                  <tr>
                    <td id="priceLabel">Price</td>
                    <td id="priceValue">${vehicle.price}</td>
                  </tr>
                  <tr>
                    <td id="transmissionLabel">Transmission</td>
                    <td id="transmissionValue">{vehicle.transmission}</td>
                  </tr>
                  <tr>
                    <td id="milesLabel">Miles</td>
                    <td id="milesValue">{vehicle.miles}</td>
                  </tr>
                  <tr>
                    <td id="mpgLabel">MPG</td>
                    <td id="mpgValue">{vehicle.mpg}</td>
                  </tr>
                  <tr>
                    <td id="fuelLabel">Fuel</td>
                    <td id="fuelValue">{vehicle.fuel_type}</td>
                  </tr>
                </tbody>
              </Table>
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
          <Button variant="secondary" onClick={handleClose} id="closeButton">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarModal;
