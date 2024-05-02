import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import negotiationService from "../services/negotiationService";

const CarCard = ({ vehicle, imageSrc, highlighted }) => {
  // if there is a vehicle object, extract the year, make, model, and price otherwise set to empty string
  vehicle = vehicle || {
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
  const [show, setShow] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("token") === null) {
        alert("You must be logged in to make an offer");
        return;
      }
      const response = await negotiationService.negotiation(
        vehicle.id,
        numberInput,
        textInput
      );
      if (response.code === 201) {
        alert("Offer has been made");
      }
      if (response.code === 400) {
        alert("Offer has not been made");
      }
    } catch (error) {}
  };

  const cardImgStyle = {
    flex: "1", // Ensure the image takes up available space within the card
    height: "100%", // Set the height of the image to fill the card
    width: "100%", // Set the width of the image to fill the card
    objectFit: "cover", // Ensure the aspect ratio is maintained
  };

  return (
    <>
      <Card className="mx-2">
        <Card.Img variant="top" src={imageSrc} style={cardImgStyle} />
        <Card.Body>
          <Card.Text>
            {vehicle.year + " " + vehicle.make + " " + vehicle.model}
          </Card.Text>
          <Card.Text>{"$" + vehicle.price}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Buy Now
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={imageSrc}
            alt=""
            style={{ marginRight: "20px", width: "50%" }}
          />
          <div>
            <p>
              {vehicle.make} {vehicle.model}
            </p>
            <p>Color: {vehicle.color}</p>
            <p>Year:{vehicle.year}</p>
            <p>${vehicle.price}</p>
            <p>Transmission: {vehicle.transmission}</p>
            <p>Miles: {vehicle.miles}</p>
            <p>MPG: {vehicle.mpg}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Message"
          />
          <input
            type="number"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="Offer"
          />
          <Button variant="primary" onClick={handleSubmit}>
            Submit
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
