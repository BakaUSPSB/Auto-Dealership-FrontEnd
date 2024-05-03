import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VehiclesPage from "./VehiclesPage";
import CardCarousel from "../components/homepage/card_carousel";

const IndexPage = () => {
  return (
    <Container fluid id="index-page-container">
      <Row id="top-image-row">
        <Col md={12} className="mb-4" id="highlighted-image-column">
          {/* Image handling is moved to CardCarousel */}
        </Col>
      </Row>

      <Row id="carousel-row">
        <Col md={12} id="carousel-column">
          <CardCarousel />
        </Col>
      </Row>

      <Row fluid id="search-gallery-row" className="d-flex align-items-center justify-content-center">
        <Col md={12} id="search-gallery-column">
          <VehiclesPage />
        </Col>
      </Row>
    </Container>
  );
};

export default IndexPage;
