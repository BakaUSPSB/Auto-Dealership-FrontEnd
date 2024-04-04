import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const VehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    transmissionType: '',
    color: '',
    photos: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Submitted Vehicle Data:', vehicleData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="make">
        <Form.Label>Make</Form.Label>
        <Form.Control type="text" name="make" value={vehicleData.make} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control type="text" name="model" value={vehicleData.model} onChange={handleChange} />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" name="year" value={vehicleData.year} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="mileage">
          <Form.Label>Mileage</Form.Label>
          <Form.Control type="text" name="mileage" value={vehicleData.mileage} onChange={handleChange} />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="transmissionType">
        <Form.Label>Transmission Type</Form.Label>
        <Form.Control type="text" name="transmissionType" value={vehicleData.transmissionType} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="color">
        <Form.Label>Color</Form.Label>
        <Form.Control type="text" name="color" value={vehicleData.color} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default VehicleForm;
