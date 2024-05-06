import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import negotiationService from "../../services/negotiationService";
import CarDetails from "../display/car_details";

const CarModal = ({ vehicle, show, handleClose }) => {
    const [offerPrice, setOfferPrice] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmitOffer = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Handle redirection to login page or show login modal
            return;
        }
        const response = await negotiationService.negotiation(
            vehicle.vehicle_id,
            offerPrice,
            msg
        );
        if (response.code === 201) {
            alert("Offer submitted successfully");
        }
    };

    const handleBuyNow = () => {
        navigate(`/purchase/${vehicle.vehicle_id}`);
    };

    const isOfferPriceEntered = offerPrice.trim() !== "";

    return (
        <>
            <style>{`
                .custom-modal {
                    max-width: 75% !important;
                }

                #carImage {
                    width: 100%;
                    object-fit: contain;
                    border: 2px solid #8a00ff;
                    border-radius: 4px;
                }

                .modal-content {
                    border: 2px solid #8a00ff;
                }

                .modal-header,
                .modal-footer {
                    background-color: #1c1c1c;
                    color: white;
                }

                .form-control {
                    border-color: #8a00ff;
                    border-radius: 4px;
                }

                .btn-primary {
                    background-color: #8a00ff;
                    border-color: #8a00ff;
                }

                .btn-secondary {
                    border-color: #8a00ff;
                    background-color: white;
                    color: #1c1c1c;
                }

                .btn-secondary:hover {
                    background-color: #e0e0e0;
                }
            `}</style>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="carModalTitle">Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "lightgray"}}>
                    <Row>
                        <Col md={6}>
                            <img
                                src={`${process.env.PUBLIC_URL}/cars/${vehicle.body_type}/${vehicle.body_type}.jpg`}
                                alt={`${vehicle.body_type}_image`}
                                id="carImage"
                            />
                        </Col>
                        <Col md={6}>
                            <CarDetails vehicle={vehicle} />
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            value={offerPrice}
                                            onChange={(e) => setOfferPrice(e.target.value)}
                                            placeholder="Enter An Offer Price"
                                            id="offerPriceInput"
                                            className="mb-3"
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={msg}
                                            onChange={(e) => setMsg(e.target.value)}
                                            placeholder="Message (Optional)"
                                            id="messageInput"
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    {isOfferPriceEntered && (
                        <Button
                            variant="primary"
                            onClick={handleSubmitOffer}
                            id="submitOfferButton"
                        >
                            Submit Offer
                        </Button>
                    )}
                    <Button
                        variant="primary"
                        onClick={handleBuyNow}
                        id="buyNowButton"
                    >
                        Buy Now
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        id="closeButton"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CarModal;
