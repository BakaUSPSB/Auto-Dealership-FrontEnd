import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import GarageService from '../services/garageService';

function AddCustomerVehicle() {
  const [show, setShow] = useState(false);
  const [vin, setVin] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [vinError, setVinError] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleVinChange = (event) => {
    setVin(event.target.value);
  };

  const handleVinBlur = () => {
    if (vin.length !== 17) {
      setVinError('VIN must be exactly 17 characters');
    } else {
      setVinError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (vin.length !== 17) {
      setVinError('VIN must be exactly 17 characters');
      return;
    }

    const data = { 
        customer_id: parseInt(localStorage.getItem("id")),
        vin: vin,
        year: parseInt(year),
        make: make,
        model: model
    };

    console.log('Form submitted with data:', data);
    const response = await GarageService.addCustomerVehicle(data);

    if (response) {
      console.log("Vehicle added successfully: ", response);
      handleClose();
      window.location.reload();
    } else {
        console.error("Error adding vehicle");
    }
  };

    return (   
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Vehicle
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formVin">
                            <Form.Label>Vin</Form.Label>
                            <Form.Control type="text" placeholder="Enter Vin" onChange={handleVinChange} onBlur={handleVinBlur} isInvalid={!!vinError} />
                        </Form.Group>
                        <Form.Group controlId="formMake">
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" placeholder="Enter Make" onChange={(e) => setMake(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Enter Model" onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" placeholder="Enter Year" onChange={(e) => setYear(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Vehicle
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    ); 
};

export default AddCustomerVehicle;