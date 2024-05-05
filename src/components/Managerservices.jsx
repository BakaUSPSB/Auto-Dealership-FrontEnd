import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import ManagerServices from '../services/managerServices';

const ManagerServiceMenu = () => {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const result = await ManagerServices.fetchServices();
            if (result && result.data) {
                setServices(result.data);
            } else {
                setError('Failed to fetch services. No data returned.');
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setError('Failed to fetch services. See console for details.');
        }
    };

    const handleShowModal = (item = {}) => {
        setShowModal(true);
        setCurrentItem(item);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentItem({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem({ ...currentItem, [name]: value });
    };

    // Part of your component
    const handleSubmit = async (e) => {
        e.preventDefault();
        const serviceData = {
            service_type: currentItem.service_type,
            price: currentItem.price,
            description: currentItem.description,
            status: currentItem.status,  // Make sure 'status' is being managed in state if it's needed
        };

        try {
            if (currentItem.service_id) {
                await ManagerServices.updateService(currentItem);  // Pass `serviceData`
            } else {
                await ManagerServices.createService(serviceData);
            }
            fetchServices();
            handleClose();
        } catch (error) {
            console.error('Error submitting service:', error);
            setError('Failed to submit service.');
        }
    };


    return (
        <div>
            <h1>Service Center Menu</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => handleShowModal()}>Add New Service</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.service_id}>
                            <td>{service.service_id}</td>
                            <td>{service.service_type}</td>
                            <td>${service.price}</td>
                            <td>{service.description}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal(service)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentItem.service_id ? 'Edit Service' : 'Add Service'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter service type"
                                name="service_type"
                                value={currentItem.service_type || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={currentItem.price || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={currentItem.description || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter status"
                                name="status"
                                value={currentItem.status || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        close


                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ManagerServiceMenu;