import React, { useState, useEffect } from 'react';
import Carousel from '../components/card_carousel'; // Update the path accordingly
import Searchbar from "../components/search_bar";
import CarGallery from "../components/car_gallery.jsx";
import { Container, Row, Col, Image } from 'react-bootstrap';

const IndexPage = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    // Assuming the 'cars' folder is under the 'public' directory
    const cardImages = Array.from({ length: 5 }, (_, i) => `${process.env.PUBLIC_URL}/cars/${i + 2}/${i + 2}_1.jpg`);

    // Styles for the highlighted image to cover the top half of the viewport
    const highlightedImageStyle = {
        width: '100%', // Ensure the image spans the full width of its container
        height: '60vh', // Use 50% of the viewport height for the image's height
        objectFit: 'cover' // Cover the container without changing the aspect ratio
    };

    // Function to handle automatic carousel rotation every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightedIndex((prevIndex) => (prevIndex + 1) % cardImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [cardImages.length]);

    return (
        <Container fluid>
            <Row>
                {/* Top half for displaying highlighted image */}
                <Col md={12} className="mb-4">
                    <Image src={cardImages[highlightedIndex]} style={highlightedImageStyle} />
                </Col>
            </Row>

            <Row>
                {/* Bottom half for carousel */}
                <Col md={12}>
                    <Carousel highlightedIndex={highlightedIndex} setHighlightedIndex={setHighlightedIndex}
                        cardImages={cardImages} />
                </Col>
            </Row>
            <Row>
                {/* Searchbar */}
                <Col md={12}>
                    <Searchbar />
                </Col>
            </Row>
            <Row fluid // Ensure full-width container
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url('/cars/carbackground.jpg')`, // Path to the image from the public directory
                backgroundSize: 'cover', // Cover the entire page
                backgroundPosition: 'center', // Center the image
                backgroundAttachment: 'fixed', // Keep the image fixed while scrolling
                minHeight: '100vh' // Ensure minimum height of the viewport
            }}>
                {/* Search Gallery */}
                <Col md={12}>
                    <CarGallery />
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
