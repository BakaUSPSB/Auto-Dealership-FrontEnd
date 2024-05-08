import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import ManagerServices from '../services/managerServices';

const ManagerContractInteraction = () => {
    const [purchases, setPurchases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPurchase, setCurrentPurchase] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const result = await ManagerServices.fetchPurchases();
            if (result && result.data) {
                setPurchases(result.data.purchases);
            } else {
                setError('Failed to fetch purchases.');
            }
        } catch (error) {
            console.error('Error fetching purchases:', error);
            setError('Failed to fetch purchases. See console for details.');
        }
    };

    const handleShowModal = (purchase = {}) => {
        setShowModal(true);
        setCurrentPurchase(purchase);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentPurchase({});
    };

    const handleContractAction = async (actionType) => {
        try {
            if (actionType === 'generate') {
                await ManagerServices.generateContract(currentPurchase.purchase_id);
            } else if (actionType === 'sign') {
                await ManagerServices.signContract(currentPurchase.purchase_id);
            }
            handleShowModal(currentPurchase);  // Refresh the modal with updated contract info
        } catch (error) {
            console.error('Error processing contract:', error);
            setError('Failed to process contract.');
        }
    };

    return (
        <div>
            <h1>Purchase Contract Management</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => (
                        <tr key={purchase.purchase_id}>
                            <td>{purchase.purchase_id}</td>
                            <td>{`${purchase.customer.first_name} ${purchase.customer.last_name}`}</td>
                            <td>{purchase.purchase_status}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowModal(purchase)}>Manage</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentPurchase.purchase_id ? `Manage Contract for Purchase ID: ${currentPurchase.purchase_id}` : 'Purchase Management'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPurchase.purchase_id && (
                        <div>
                            <p><strong>Customer:</strong> {`${currentPurchase.customer.first_name} ${currentPurchase.customer.last_name}`}</p>
                            <p><strong>Status:</strong> {currentPurchase.purchase_status}</p>
                            <Button variant="secondary" onClick={() => handleContractAction('generate')}>Generate Contract</Button>
                            <Button variant="success" onClick={() => handleContractAction('sign')} style={{ marginLeft: '10px' }}>Sign Contract</Button>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManagerContractInteraction;
