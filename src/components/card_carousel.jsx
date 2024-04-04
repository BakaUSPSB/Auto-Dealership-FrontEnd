import React from 'react';
import { Container, Row, Button } from "react-bootstrap";
import CarCard from './car_card'; // Ensure this is the correct path

const CardCarousel = ({ highlightedIndex, setHighlightedIndex, cardImages }) => {
  // Navigate to the previous card
  const goToPrevCard = () => {
    setHighlightedIndex((prevIndex) => (prevIndex - 1 + cardImages.length) % cardImages.length);
  };

  // Navigate to the next card
  const goToNextCard = () => {
    setHighlightedIndex((prevIndex) => (prevIndex + 1) % cardImages.length);
  };

  // Handler for clicking a card
  const handleCardClick = (index) => {
    setHighlightedIndex(index);
  };

  return (
    <Container fluid style={{ position: 'relative', width: '100%', padding: '0' }}>
      <Button onClick={goToPrevCard} style={{ position: 'absolute', left: 0, zIndex: 1, top: '50%', transform: 'translateY(-50%)' }}>&lt;</Button>
      <Row className="justify-content-center" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {cardImages.map((imageSrc, index) => (
          <div key={index} style={{ display: 'inline-block', width: '300px', margin: '0 10px', cursor: 'pointer' }} onClick={() => handleCardClick(index)}>
            <CarCard imageSrc={imageSrc} highlighted={index === highlightedIndex} />
          </div>
        ))}
      </Row>
      <Button onClick={goToNextCard} style={{ position: 'absolute', right: 0, zIndex: 1, top: '50%', transform: 'translateY(-50%)' }}>&gt;</Button>
    </Container>
  );
};

export default CardCarousel;
