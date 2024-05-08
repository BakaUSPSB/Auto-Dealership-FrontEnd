import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function ServicePage() {
    // Placeholder data for service requests
    const serviceRequests = [
        { id: 1, appointmentTime: "2024-04-04 09:00", jobType: "Oil Change", make: "Toyota", model: "Camry", color: "Blue", plate: "ABC123", status: "Pending" },
        { id: 2, appointmentTime: "2024-04-04 10:30", jobType: "Tire Rotation", make: "Honda", model: "Accord", color: "Red", plate: "XYZ789", status: "In Progress" },
        { id: 3, appointmentTime: "2024-04-05 11:15", jobType: "Brake Replacement", make: "Ford", model: "F-150", color: "Black", plate: "DEF456", status: "Completed" },
    ];

    return (
        <Container
            fluid // Ensure full-width container
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url('/cars/carbackground.jpg')`, // Path to the image from the public directory
                backgroundSize: 'cover', // Cover the entire page
                backgroundPosition: 'center', // Center the image
                backgroundAttachment: 'fixed', // Keep the image fixed while scrolling
                minHeight: '100vh' // Ensure minimum height of the viewport
            }}
        >
            <Row className="justify-content-md-center">
                <Col xs={12} md={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Appointment Time</th>
                                <th>Job Type</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Plate</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceRequests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.appointmentTime}</td>
                                    <td>{request.jobType}</td>
                                    <td>{request.make}</td>
                                    <td>{request.model}</td>
                                    <td>{request.color}</td>
                                    <td>{request.plate}</td>
                                    <td>{request.status}</td>
                                    <td><Button variant="primary">Update Status</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default ServicePage;
