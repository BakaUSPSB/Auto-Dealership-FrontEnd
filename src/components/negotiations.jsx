import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import NegotiationDetails from "./negotiationDetails";
import userNegotiationService from "../services/userNegotiationService";
import negotiationService from "../services/negotiationService";
import CounterOffer from "./counterOffer";

const NegotiationTable = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNegotiation, setSelectedNegotiation] = useState(null); // Separate state for selected negotiation details

  useEffect(() => {
    const fetchNegotiations = () => {
      const role = localStorage.getItem("role");
      setRole(role);
      const service =
        role === "customer" ? negotiationService : userNegotiationService;

      service
        .negotiations()
        .then((response) => {
          if (response.code === 200) {
            setNegotiations(response.data.negotiations);
          }
        })
        .catch((error) => {
          console.error("Error fetching negotiations:", error);
        });
    };

    fetchNegotiations();
  }, []);

  const handleShowModal = (negotiation) => {
    setShowModal(true);
    setSelectedNegotiation(negotiation); // Set the selected negotiation
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNegotiation(null); // Reset the selected negotiation
  };

  return (
    <>
      {role === "customer" ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(negotiations) &&
                negotiations.map((negotiation) => (
                  <tr key={negotiation.negotiation_id}>
                    <td>{`${negotiation.vehicle.make} ${negotiation.vehicle.model} ${negotiation.vehicle.year}`}</td>
                    <td>${negotiation.current_offer}</td>
                    <td>{negotiation.negotiation_status}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowModal(negotiation)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Negotiation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedNegotiation && (
                <NegotiationDetails
                  negotiationId={selectedNegotiation.negotiation_id}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              {selectedNegotiation && (
                <CounterOffer
                  negotiation_id={selectedNegotiation.negotiation_id}
                />
              )}
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(negotiations) &&
                negotiations.map((negotiation) => (
                  <tr key={negotiation.negotiation_id}>
                    <td>{`${negotiation.vehicle.make} ${negotiation.vehicle.model} ${negotiation.vehicle.year}`}</td>
                    <td>${negotiation.current_offer}</td>
                    <td>{negotiation.negotiation_status}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowModal(negotiation)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Negotiation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedNegotiation && (
                <NegotiationDetails
                  negotiationId={selectedNegotiation.negotiation_id}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              {selectedNegotiation && (
                <CounterOffer
                  negotiation_id={selectedNegotiation.negotiation_id}
                />
              )}
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default NegotiationTable;
