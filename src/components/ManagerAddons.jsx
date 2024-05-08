import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import ManagerServices from '../services/managerServices';

const ManagerAddonMenu = () => {
    const [addons, setAddons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAddon, setCurrentAddon] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAddons();
    }, []);

    const fetchAddons = async () => {
        try {
            const result = await ManagerServices.fetchAddons();
            if (result && result.data) {
                setAddons(result.data);
            } else {
                setError('Failed to fetch addons. No data returned.');
            }
        } catch (error) {
            setError('Failed to fetch addons. See console for details.');
        }
    };

    const handleShowModal = (addon = {}) => {
        setShowModal(true);
        setCurrentAddon(addon);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentAddon({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAddon({ ...currentAddon, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const addonData = {
            addon_name: currentAddon.addon_name,
            price: currentAddon.price,
            description: currentAddon.description,
            status: currentAddon.status,
        };

        try {
            if (currentAddon.addon_id) {
                await ManagerServices.updateAddon(currentAddon.addon_id, addonData);
            } else {
                await ManagerServices.createAddon(addonData);
            }
            fetchAddons();
            handleClose();
        } catch (error) {
            console.error('Error submitting addon:', error);
            setError('Failed to submit addon.');
        }
    };

    const toggleAddonStatus = async (addon) => {
        const newStatus = addon.status === 1 ? 0 : 1;
        try {
            await ManagerServices.changeAddonStatus(addon.addon_id, newStatus);
            fetchAddons();  // Refresh the list to reflect the change
        } catch (error) {
            console.error('Error changing addon status:', error);
            setError('Failed to change addon status. See console for details.');
        }
    };

    return (
        <div>
            <h1>Addon Management Menu</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => handleShowModal()}>Add New Addon</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {addons.map((addon) => (
                        <tr key={addon.addon_id}>
                            <td>{addon.addon_id}</td>
                            <td>{addon.addon_name}</td>
                            <td>${addon.price}</td>
                            <td>{addon.description}</td>
                            <td>{addon.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal(addon)}>Edit</Button>
                                <Button 
                                    variant={addon.status === 'ACTIVE' ? 'danger' : 'success'} 
                                    onClick={() => toggleAddonStatus(addon)} 
                                    style={{ marginLeft: '10px' }}
                                >
                                    {addon.status === 1 ? 'Deactivate' : 'Activate'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentAddon.addon_id ? 'Edit Addon' : 'Add Addon'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter addon name"
                                name="addon_name"
                                value={currentAddon.addon_name || ''}
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
                                value={currentAddon.price || ''}
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
                                value={currentAddon.description || ''}
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
                                value={currentAddon.status === 'ACTIVE' ? 'Active' : 'Inactive'}
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
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ManagerAddonMenu;
