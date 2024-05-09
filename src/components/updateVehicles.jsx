import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ManagerServices from '../services/managerServices';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    vin: '',
    price: '',
    year: '',
    make: '',
    model: '',
    body_type: '',
    miles: '',
    mpg: '',
    color: '',
    fuel_type: '',
    transmission: '',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'image' && e.target.value === '') {
      setFormData({ ...formData, [e.target.name]: null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ManagerServices.createVehicle(formData);
      if (response) {
        console.log('Vehicle created:', response);
      } else {
        console.log('Error creating vehicle');
      }
    } catch (error) {
      console.error('Error creating vehicle:', error);
    }
  }

  return (
    <>
    <div>
          <h6> ADD NEW INVENTORY </h6>
    </div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="vin">
        <Form.Label>VIN</Form.Label>
        <Form.Control type="text" placeholder="Enter VIN" name="vin" value={formData.vin} onChange={handleChange} isInvalid={!!errors.vin} />
        <Form.Control.Feedback type="invalid">{errors.vin}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter price" name="price" value={formData.price} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control type="text" placeholder="Enter year" name="year" value={formData.year} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="make">
        <Form.Label>Make</Form.Label>
        <Form.Control type="text" placeholder="Enter make" name="make" value={formData.make} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control type="text" placeholder="Enter model" name="model" value={formData.model} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="body_type">
        <Form.Label>Body Type</Form.Label>
        <Form.Control type="text" placeholder="Enter body type" name="body_type" value={formData.body_type} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="miles">
        <Form.Label>Miles</Form.Label>
        <Form.Control type="text" placeholder="Enter miles" name="miles" value={formData.miles} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="mpg">
        <Form.Label>MPG</Form.Label>
        <Form.Control type="text" placeholder="Enter MPG" name="mpg" value={formData.mpg} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="color">
        <Form.Label>Color</Form.Label>
        <Form.Control type="text" placeholder="Enter color" name="color" value={formData.color} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="fuel_type">
        <Form.Label>Fuel Type</Form.Label>
        <Form.Control type="text" placeholder="Enter fuel type" name="fuel_type" value={formData.fuel_type} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="transmission">
        <Form.Label>Transmission</Form.Label>
        <Form.Control type="text" placeholder="Enter transmission" name="transmission" value={formData.transmission} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Enter image URL" name="image" value={formData.image} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};

export default VehicleForm;
