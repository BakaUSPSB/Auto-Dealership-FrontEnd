import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import CarGallery from "../components/car_gallery";

function VehiclesPage(){
    return(
        <Container fluid style={{padding: 0, margin: 0}}>
            <Row>
                {/* Searchbar */}
                <Col md={12} className="text-center" style={{padding: '24px', margin:0, backgroundColor: 'lightgray'}}>
                    <h1 className="display-5 font-weight-bold">Vehicles</h1>
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