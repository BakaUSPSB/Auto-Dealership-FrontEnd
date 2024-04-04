import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

const ServicePage = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [notes, setNotes] = useState('');

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle submission
    console.log('Selected car:', selectedCar);
    console.log('Selected service:', selectedService);
    console.log('Notes:', notes);
    // Reset state after submission
    setSelectedCar(null);
    setSelectedService('');
    setNotes('');
  };

  return (
    
    <Container >
      <Row>
        <Col>
          <h2>Service</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index} className={selectedCar === car ? 'selected' : ''} onClick={() => handleCarSelect(car)}>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>
                    <Button>Select</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="serviceSelect">
              <Form.Label>Select Service:</Form.Label>
              <Form.Control as="select" value={selectedService} onChange={handleServiceChange}>
                <option value="">Select...</option>
                <option value="brakes">Brakes</option>
                <option value="oil">Oil</option>
                <option value="tire">Tire</option>
                <option value="wipers">Wipers</option>
                <option value="all">All</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Label>Notes:</Form.Label>
              <Form.Control as="textarea" rows={3} value={notes} onChange={handleNotesChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicePage;
