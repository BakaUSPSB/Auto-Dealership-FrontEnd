import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CarCard = ({ imageSrc }) => {
  const cardStyle = {
    width: '18rem', // Set a fixed width for the card
    height: '300px', // Set a fixed height for the card
    margin: '1rem' // Optional: added to ensure some spacing around cards
  };

  const cardImgStyle = {
    height: '200px', // Maintain a fixed height for the image
    objectFit: 'cover' // Ensure the aspect ratio is maintained
  };

  const cardBodyStyle = {
    display: 'flex', // Use flex to control the layout of the card body
    flexDirection: 'column', // Stack the text and button vertically
    justifyContent: 'space-between', // Distribute space evenly
    flexGrow: 1 // Allow the card body to fill available space
  };

  return (
    <Card style={cardStyle} className="mx-2">
      <Card.Img variant="top" src={imageSrc} style={cardImgStyle} />
      <Card.Body style={cardBodyStyle}>
        <Card.Text>Placeholder Text</Card.Text>
        <Button variant="primary">Click Me</Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
