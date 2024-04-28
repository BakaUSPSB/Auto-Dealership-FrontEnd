import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import VehiclesPage from './VehiclesPage';
import CardCarousel from "../components/homepage/card_carousel";

const IndexPage = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [highlightedImageSrc, setHighlightedImageSrc] = useState('');

    // Fetch car data from the API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('https://expert-space-rotary-phone-4jqq474qjq5r37qq5-5000.app.github.dev/api/inventory/top-vehicles');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const cars = data.data;
                if (cars.length > 0) {
                    const highlightedCar = cars[highlightedIndex];
                    if (highlightedCar) {
                        const imageSrc = `${process.env.PUBLIC_URL}/cars/${highlightedCar.make}/${highlightedCar.make}.jpg`;
                        setHighlightedImageSrc(imageSrc);
                    }
                }
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchCars();

        // Clear interval on unmount
        return () => clearInterval();
    }, [highlightedIndex]);

    // Styles for the highlighted image
    const highlightedImageStyle = {
        width: '100%',
        height: '60vh',
        objectFit: 'cover',
        margin: 0,
        padding: 0
    };

    // Function to handle automatic carousel rotation every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightedIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Define the fade-in-out class directly within the component
    const fadeInOutStyle = `
        .fade-in-out {
            transition: opacity 0.5s ease-in-out;
        }
    `;

    return (
        <Container fluid id="index-page-container">
            {/* Include the style tag with the fade-in-out class */}
            <style>{fadeInOutStyle}</style>

            <Row id="top-image-row">
                {/* Top half for displaying highlighted image */}
                <Col md={12} className="mb-4" id="highlighted-image-column">
                    <Image
                        src={highlightedImageSrc}
                        style={{ ...highlightedImageStyle, opacity: highlightedImageSrc ? 1 : 0 }}
                        id="highlighted-image"
                        className="fade-in-out" // Apply the fade-in-out class here
                        onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/cars/dealership.jpg`}
                    />
                </Col>
            </Row>

            <Row id="carousel-row">
                {/* Bottom half for carousel */}
                <Col md={12} id="carousel-column">
                    <CardCarousel
                        highlightedIndex={highlightedIndex}
                        setHighlightedIndex={setHighlightedIndex}
                        setHighlightedImageSrc={setHighlightedImageSrc} // Pass the function here
                    />
                </Col>
            </Row>

            <Row fluid id="search-gallery-row" className="d-flex align-items-center justify-content-center">
                {/* Search Gallery */}
                <Col md={12} id="search-gallery-column">
                    <VehiclesPage />
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
