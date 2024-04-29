import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import CarCard from "./car_card.jsx"; // Updated import path
import top5Service from "../../services/top5Service.jsx";

const CardCarousel = ({ highlightedIndex, setHighlightedIndex }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch the data when the component mounts
    top5Service
      .getTop5()
      .then((data) => {
        if (data.status === "success") {
          setVehicles(data.data);
        } else {
          console.error("Failed to fetch top vehicles:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching top vehicles:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Navigate to the previous card
  const goToPrevCard = () => {
    setHighlightedIndex(
      (prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length
    );
  };

  // Navigate to the next card
  const goToNextCard = () => {
    setHighlightedIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
  };

  // Handler for clicking a card
  const handleCardClick = (index) => {
    setHighlightedIndex(index);
  };

  const buttonStyle = {
    margin: "0 10px",
  };

  const cardWrapperStyle = {
    width: "fit-content", // Adjusted width to fit the content
    height: "fit-content", // Adjusted height to fit the content
    margin: "0", // Removed margin
    padding: "0", // Removed padding
  };

  return (
    <Container fluid id="card-carousel-container">
      <Row className="align-items-center justify-content-center" id="card-row">
        <Col xs={1} className="d-flex justify-content-center">
          <Button
            id="previous-button"
            onClick={goToPrevCard}
            style={buttonStyle}
          >
            &lt;
          </Button>
        </Col>
        {vehicles.map((vehicle, index) => (
          <Col
            xs={2}
            key={index}
            id={`card-${index}`}
            style={cardWrapperStyle}
            onClick={() => handleCardClick(index)}
          >
            <CarCard
              id={`car-card-${index}`}
              vehicle={vehicle}
              highlighted={index === highlightedIndex}
            />
          </Col>
        ))}
        <Col xs={1} className="d-flex justify-content-center">
          <Button id="next-button" onClick={goToNextCard} style={buttonStyle}>
            &gt;
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CardCarousel;
