import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VehiclesPage from "./VehiclesPage";
import CardCarousel from "../components/homepage/card_carousel";

const IndexPage = () => {
  return (
    <Container fluid style={{ padding: 0, margin: 0 }} id="index-page-container">
      <Row id="carousel-row" style={{ margin: 0 }}>
        <Col xs={12} style={{ padding: 0 }} id="carousel-column">
          <CardCarousel />
        </Col>
      </Row>
      <Row id="search-gallery-row" style={{ margin: 0 }} className="d-flex align-items-center justify-content-center">
        <Col xs={12} style={{ padding: 0 }} id="search-gallery-column">
          <VehiclesPage />
        </Col>
      </Row>
    </Container>
  );
};

export default IndexPage;
