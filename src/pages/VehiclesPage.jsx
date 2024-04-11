import {Col, Container, Image, Row} from "react-bootstrap";
import Searchbar from "../components/search_bar";
import Carousel from "../components/card_carousel";
import React from "react";
import CarGallery from "../components/car_gallery";

function VehiclesPage(){
    return(
        <Container fluid style={{padding: 0, margin: 0}}>
            <Row>
                {/* Searchbar */}
                <Col md={12} style={{padding: '24px', margin:0, backgroundColor: 'lightgray'}}>
                    <Searchbar />
                </Col>
            </Row>
            <Row>
                {/* Search Gallery */}
                <Col md={12}>
                    {/* <CarGallery /> */}
                </Col>
            </Row>
        </Container>
    );
}

export default VehiclesPage;