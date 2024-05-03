import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table, Modal } from "react-bootstrap";
import TechServiceAppointments from "../services/TechServiceAppointments";

function TechDash() {
    const [response, setResponse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [technicianNotes, setTechnicianNotes] = useState("");

    const handleShowModal = (appointment) => {
        setSelectedAppointment(appointment);
        setTechnicianNotes(appointment.service_ticket[0].technician_note);
        setShowModal(true);
    };

    const handleTechnicianNotesUpdate = (event) => {
        TechServiceAppointments.updateTechnicianNotes(selectedAppointment.service_ticket[0].service_ticket_id, technicianNotes)
            .then((response) => {
                console.log(response);
                handleCloseModal();
                setResponse(response => response.map(appointment => 
                    appointment.appointment_id === selectedAppointment.appointment_id ? 
                    {
                        ...appointment,
                        service_ticket: [
                            {
                                ...appointment.service_ticket[0],
                                technician_note: technicianNotes
                            }
                        ]
                    } 
                    : appointment
                ));
            })
            .catch((error) => {
                console.error("Error updating technician notes: ", error);
            });
    };

    const handleUpdate = () => {
        TechServiceAppointments.updateServiceStatus(selectedAppointment.service_ticket[0].service_ticket_id)
            .then((response) => {
                console.log(response);
                handleCloseModal();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error updating service status: ", error);
            });
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);        
        setShowModal(false);
    };

    useEffect(() => {
        const response = TechServiceAppointments.getServiceAppointments()
            .then((response) => {
                setResponse(response.data.appointments);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);


    return (
        <Container
            fluid // Ensure full-width container
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url('/cars/carbackground.jpg')`, // Path to the image from the public directory
                backgroundSize: 'cover', // Cover the entire page
                backgroundPosition: 'center', // Center the image
                backgroundAttachment: 'fixed', // Keep the image fixed while scrolling
                minHeight: '100vh' // Ensure minimum height of the viewport
            }}
        >
            <Row className="justify-content-md-center">
                <Col xs={12} md={10}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Appointment Status</th>
                                <th>Service Time</th>
                                <th>Customer Notes</th>
                                <th>Technician ID</th>
                                <th>Service Status</th>
                                <th>Technician Notes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{response && response.map((appointments) => (
                            <tr key={appointments.appointment_id}>
                                <td>{appointments.status}</td>
                                <td>{appointments.time_slot.properties.start_time}</td>
                                <td>{appointments.service_ticket[0].customer_note}</td>
                                <td>{appointments.service_ticket[0].user_id}</td>
                                <td>
                                    {appointments.status === 'CONFIRMED' ? appointments.service_ticket[0].status : 'Waiting for Confirmation...'}
                                </td>
                                <td>{appointments.service_ticket[0].technician_note}</td>
                                <td>
                                    {appointments.status === 'CONFIRMED' &&
                                    <Button variant="primary" onClick={() => handleShowModal(appointments)}>View Ticket</Button>
                                    }
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Service Ticket</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><b>Start Time: </b> {selectedAppointment && selectedAppointment.time_slot.properties.start_time}</p>
                            <p><b>End Time: </b> {selectedAppointment && selectedAppointment.time_slot.properties.end_time}</p>
                            <p><b>Customer ID: </b> {selectedAppointment && selectedAppointment.customer.properties.customer_id}</p>
                            <p><b>Customer Name: </b> {selectedAppointment && selectedAppointment.customer.properties.first_name} {selectedAppointment && selectedAppointment.customer.properties.last_name}</p>
                            <p><b>Ticket Status: </b> {selectedAppointment && selectedAppointment.service_ticket[0].status}</p>
                            {selectedAppointment && selectedAppointment.service_ticket.map((ticket, index) => (
                                <div key={index}>
                                    {ticket.services.map((service, index) => (
                                    <div key={index} style={{backgroundColor: 'lightgray'}}>
                                        <p><b>Service Type: </b> {service.name}</p>
                                        <p><b>Service Description: </b> {service.description}</p>
                                        <p><b>Service Cost: </b> ${service.price}</p>
                                    </div>
                                ))}
                                <p><b>Customer Note: </b> {selectedAppointment && selectedAppointment.service_ticket[0].customer_note}</p>
                                <div>
                                    <label><b>Technician Note: </b></label>
                                    <input type="text" value={technicianNotes} onChange={(event) => setTechnicianNotes(event.target.value)} />
                                </div>
                            </div>
                            ))}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleTechnicianNotesUpdate}>Add Notes</Button>
                            <Button variant="primary" onClick={handleUpdate}>Terminate Ticket</Button>
                            <Button variant="secondary" onClick={handleCloseModal}>Exit</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default TechDash;
