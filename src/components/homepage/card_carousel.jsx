import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col, Image } from "react-bootstrap";
import CarCard from "./car_card";
import top5Service from "../../services/top5Service";

const CardCarousel = () => {
  const [vehicles, setVehicles] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const highlightedImageStyle = {
    width: "100%",
    height: "60vh",
    objectFit: "cover",
    margin: 0,
    padding: 0,
  };
  useEffect(() => {
    top5Service.getTop5()
      .then((response) => {
        if (response.status === "success") {
          setVehicles(response.data);
        } else {
          console.error("Failed to fetch top vehicles:", response.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching top vehicles:", error);
      });
  }, []);

  return (
    <div className="carousel-container">
      <div className="highlighted-image-container">
        {vehicles.length > 0 && (
          <Image
            src={`${process.env.PUBLIC_URL}/cars/${vehicles[highlightedIndex].body_type}/${vehicles[highlightedIndex].body_type}.jpg`}
            fluid
                        style={{
              ...highlightedImageStyle,
            }}
            className="highlighted-vehicle-image"
          />
        )}
      </div>
      <Container fluid id="card-carousel-container">
        <Row className="align-items-center justify-content-center" id="button-and-card-row">
          <Col xs={1} className="d-flex justify-content-center" id="previous-button-column">
            <Button
              id="previous-button"
              onClick={() =>
                setHighlightedIndex((prevIndex) =>
                  (prevIndex - 1 + vehicles.length) % vehicles.length
                )
              }
              style={{ margin: "0 10px" }}
            >
              &lt;
            </Button>
          </Col>
          {vehicles.map((vehicle, index) => (
            <Col
              xs={2}
              key={index}
              id={`card-wrapper-${index}`}
              onClick={() => setHighlightedIndex(index)}
              className="d-flex justify-content-center"
            >
              <CarCard
                id={`car-card-${index}`}
                vehicle={vehicle}
                highlighted={index === highlightedIndex}
              />
            </Col>
          ))}
          <Col xs={1} className="d-flex justify-content-center" id="next-button-column">
            <Button
              id="next-button"
              onClick={() =>
                setHighlightedIndex((prevIndex) =>
                  (prevIndex + 1) % vehicles.length
                )
              }
              style={{ margin: "0 10px" }}
            >
              &gt;
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CardCarousel;

