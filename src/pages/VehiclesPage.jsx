import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import CarGallery from "../components/homepage/car_gallery";

function VehiclesPage() {
  return (
    <Container fluid style={{ padding: 0, margin: 0 , width: "100vw", borderColor: "green", borderStyle: "solid"}} id="vehicles-page-container">
      <Row id="searchbar-row">
        {/* Searchbar */}
        <Col md={12} className="text-center" style={{ padding: 0, margin: 0, backgroundColor: 'lightgray', borderColor: "yellow", borderStyle: "solid"}} id="searchbar-column">
          <h1 className="display-5 font-weight-bold" id="searchbar-title">Vehicles</h1>
        </Col>
      </Row>
      <Row id="search-gallery-row">
        {/* Search Gallery */}
        <Col md={12} id="search-gallery-column" style={{padding: 0}}>
          <CarGallery id="car-gallery" />
        </Col>
      </Row>
    </Container>
  );
}

export default VehiclesPage;
