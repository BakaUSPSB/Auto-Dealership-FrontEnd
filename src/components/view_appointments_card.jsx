import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Container, Form, Row, Table, Modal} from 'react-bootstrap';
import ViewCustomerAppointmentService from '../services/viewCustomerAppoinmentService.jsx';

//THIS IS FOR THE CUSTOMER VIEW APPOINTMENTS PAGE

const AppointmentCard = ({ customer_id }) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleShowModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
  };

  useEffect(() => {
    setIsLoading(true);
    ViewCustomerAppointmentService.getCustomerAppointments(customer_id)
    .then((response) => {
      console.log('Received data: ', response.data);
      if (Array.isArray(response.data.appointments)) {
        setResponse(response.data.appointments);
      } else {
        console.error("Expected an array but received: ", response.data.appointments);
      }
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching garage vehicles: ", error);
      setIsLoading(false);
    });
  }, [customer_id]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <>
    <Card>
      <Card.Body>
        <Card.Title>Appointments</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Date and Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {response.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.appointment_type}</td>
                <td>{appointment.time_slot.properties.start_time}</td>
                <td>{appointment.status}</td>
                <td>
                  <Button variant="danger" onClick={() => handleShowModal(appointment)}>Cancel</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this appointment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={ async () =>{
            try {
              if (selectedAppointment) {
                const cancelResponse = await ViewCustomerAppointmentService.cancelAppointment(selectedAppointment.appointment_id);
                ViewCustomerAppointmentService.updateTimeSlotAvailability(selectedAppointment.time_slot_id);
                console.log('Cancel appointment response:', cancelResponse);
                window.location.reload();
              } else {
                  alert('Failed to cancel appointment');
              }
            } catch (error) {
              console.error('Error cancelling appointment:', error);
              alert('Failed to cancel appointment');
            };
            handleCloseModal();
          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentCard;