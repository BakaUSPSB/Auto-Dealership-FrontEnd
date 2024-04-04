import {Col, Container, Image, Row} from "react-bootstrap";
import Searchbar from "../components/search_bar";
import Carousel from "../components/card_carousel";
import React from "react";
import CarGallery from "../components/car_gallery";

function VehiclesPage(){
    return(
        <Container fluid>
            <Row>
                {/* Searchbar */}
                <Col md={12}>
                    <Searchbar />
                </Col>
            </Row>
            <Row>
                {/* Search Gallery */}
                <Col md={12}>
                    <CarGallery />
                </Col>
            </Row>
        </Container>
    );
}

export default VehiclesPage;