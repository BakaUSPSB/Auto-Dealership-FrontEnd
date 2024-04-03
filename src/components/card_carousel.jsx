//card_carousel.jsx
import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import CarCard from './car_card'; // Make sure the path is correct

const CardCarousel = ({ highlightedIndex, setHighlightedIndex, cardImages }) => {
  return (
    <Container style={{padding: 0, margin:0 , height: '400px'}}>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button onClick={() => setHighlightedIndex((highlightedIndex - 1 + cardImages.length) % cardImages.length)}>&lt;</Button>
        </Col>
        {cardImages.map((imageSrc, index) => (
          <Col key={index} xs={6} md={4}>
            <CarCard imageSrc={imageSrc} highlighted={index === highlightedIndex} />
          </Col>
        ))}
        <Col xs="auto">
          <Button onClick={() => setHighlightedIndex((highlightedIndex + 1) % cardImages.length)}>&gt;</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CardCarousel;
