import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import '../styles/tableStyle.css'

const ServicePage = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [notes, setNotes] = useState('');

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'all') {
      setSelectedService({
        brakes: checked,
        oil: checked,
        tire: checked,
        wipers: checked,
        all: checked,
      });
    } else {
      setSelectedService(prevState => ({
        ...prevState,
        [name]: checked,
        all: prevState.brakes && prevState.oil && prevState.tire && prevState.wipers && checked,
      }));
    }
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
              {['brakes', 'oil', 'tire', 'wipers', 'all'].map(service => (
                <Form.Check 
                  type="checkbox"
                  id={service}
                  name={service}
                  label={service.charAt(0).toUpperCase() + service.slice(1)}
                  checked={selectedService[service]}
                  onChange={handleServiceChange}
                />
              ))}
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
