import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CarCard = ({ vehicle, imageSrc, highlighted }) => {

  // if there is a vehicle object, extract the year, make, model, and price otherwise set to empty string
  vehicle = vehicle || { year: '', make: '', model: '', price: '' };

  const cardStyle = {
    width: '250px', // Set a fixed width for the card
    height: '300px', // Set a fixed height for the card
    border: highlighted ? '2px solid blueviolet' : '2px solid transparent', // Conditionally apply border
    display: 'flex', // Use flex to control the layout of the card
    flexDirection: 'column', // Stack the text and button vertically
    justifyContent: 'space-between' // Distribute space evenly
  };

  const cardImgStyle = {
    flex: '1', // Ensure the image takes up available space within the card
    height: '100%', // Set the height of the image to fill the card
    width: '100%', // Set the width of the image to fill the card
    objectFit: 'cover' // Ensure the aspect ratio is maintained
  };

  return (
    <Card style={cardStyle} className="mx-2">
      <Card.Img variant="top" src={imageSrc} style={cardImgStyle} />
      <Card.Body>
        <Card.Text>{vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model}</Card.Text>
        <Card.Text>{'$' + vehicle.price}</Card.Text>
        <Button variant="primary">Click Me</Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
