import React, { useState } from 'react';
import Carousel from '../components/card_carousel'; // Update the path accordingly
import { Container, Row, Col, Image } from 'react-bootstrap';

const IndexPage = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Assuming the 'cars' folder is under the 'public' directory
  const cardImages = Array.from({ length: 5 }, (_, i) => `${process.env.PUBLIC_URL}/cars/${i + 1}/${i + 1}_1.jpg`);

  // Styles for the highlighted image to cover the top half of the viewport
  const highlightedImageStyle = {
    width: '100%', // Ensure the image spans the full width of its container
    height: '50vh', // Use 50% of the viewport height for the image's height
    objectFit: 'cover' // Cover the container without changing the aspect ratio
  };

  return (
    <Container fluid style={{padding: 0, margin:0 }}>
      <Row style={{padding: 0, margin:0 }}>
        {/* Top half for displaying highlighted image */}
        <Col md={12} className="mb-4" style={{padding: 0, margin:0 }}>
          <Image src={cardImages[highlightedIndex]} style={highlightedImageStyle} />
        </Col>
      </Row>
      <Row style={{backgroundColor: "lightgray", margin: 0, width: '100%'}}>
        {/* Bottom half for carousel */}
        <Col md={12}>
          <Carousel highlightedIndex={highlightedIndex} setHighlightedIndex={setHighlightedIndex} cardImages={cardImages} />
        </Col>
      </Row>
    </Container>
  );
};

export default IndexPage;
