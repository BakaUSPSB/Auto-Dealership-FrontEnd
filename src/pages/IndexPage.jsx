import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import CardCarousel from "../components/homepage/card_carousel";
import CarGallery from "../components/homepage/car_gallery";

const IndexPage = () => {
    return (
        <Container fluid id="index-page-container" style={{backgroundColor: "#1c1c1c"}}>
            <Row id="carousel-row">
                <Col xs={12}  id="carousel-column">
                    <CardCarousel id="card-carousel"/>
                </Col>
            </Row>
            <Row id="gallery-row" >
                <Col xs={12}  id="carousel-column">
                    <CarGallery id="card-gallery"/>
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
