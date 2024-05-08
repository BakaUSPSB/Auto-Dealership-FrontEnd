import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import GarageService from '../services/garageService';

function RemoveCustomerVehicle({ customerVehicleId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = async (event) => {
    event.preventDefault();

    const response = await GarageService.deleteCustomerVehicle(customerVehicleId);

    if (response) {
      console.log("Vehicle removed successfully: ", response);
      handleClose();
      window.location.reload();
    } else {
      console.error("Error removing vehicle");
    }
  };

    return (   
        <div>
            <Button variant="danger" onClick={handleShow}>
                Remove Vehicle
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleRemove}>
                        <Form.Group>
                            <Form.Label>Are you sure you want to remove this vehicle?</Form.Label>
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Remove Vehicle
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RemoveCustomerVehicle;