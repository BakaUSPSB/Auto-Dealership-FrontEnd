import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    transmissionType: '',
    color: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending data to backend or other actions
    console.log('Form submitted:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="make">
        <Form.Label>Make</Form.Label>
        <Form.Control type="text" placeholder="Enter make" name="make" value={formData.make} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control type="text" placeholder="Enter model" name="model" value={formData.model} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control type="text" placeholder="Enter year" name="year" value={formData.year} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="mileage">
        <Form.Label>Mileage</Form.Label>
        <Form.Control type="text" placeholder="Enter mileage" name="mileage" value={formData.mileage} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="transmissionType">
        <Form.Label>Transmission Type</Form.Label>
        <Form.Control type="text" placeholder="Enter transmission type" name="transmissionType" value={formData.transmissionType} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="color">
        <Form.Label>Color</Form.Label>
        <Form.Control type="text" placeholder="Enter color" name="color" value={formData.color} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default VehicleForm;
