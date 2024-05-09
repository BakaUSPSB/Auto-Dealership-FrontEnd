import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal} from 'react-bootstrap';
import ManagerServices from '../services/managerServices';

//THIS IS FOR THE MANAGER VIEW APPOINTMENTS PAGE

const AppointmentComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedServiceTech, setSelectedServiceTech] = useState('');
  const [showModal, setShowModal] = useState(false);

  const serviceTechs = ['Mr. Technician'];

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
    console.log('View appointment:', appointment);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmAppointment = (appointment) => {
    
    const response = ManagerServices.updateAppointmentStatus(appointment.appointment_id);

    if (response) {
      setAppointments(appointments.map(app => 
        app.appointment_id === appointment.appointment_id ? { ...app, status: 'CONFIRMED' } : app
      ));
    } 
    console.log('Confirm appointment:', appointment);
  };

  const handleCancelAppointment = (appointment) => {

    const response = ManagerServices.cancelAppointment(appointment.appointment_id);

    if (response) {
      setAppointments(appointments.map(app => 
        app.appointment_id === appointment.appointment_id ? { ...app, status: 'CANCELLED' } : app
      ));
    }
    console.log('Cancel appointment:', appointment);
  };

  const handleServiceTechSelect = async (appointment, value) => {
    setSelectedServiceTech(prev => ({ ...prev, [appointment.appointment_id]: value }));

    const response = await ManagerServices.getAppointmentServiceTickets();

    if (response && response.data && response.data.appointments) {
      const selectedAppointment = response.data.appointments.find(app => app.appointment_id === appointment.appointment_id);
      if (selectedAppointment && selectedAppointment.service_ticket) {
        selectedAppointment.service_ticket.forEach(async ticket => {
          const updateResponse = await ManagerServices.updateUserIdForServiceTicket(ticket.service_ticket_id);
          if (updateResponse) {
            console.log('Updated user_id for service ticket:', ticket.service_ticket_id);
          }
          });
      }
    }

    console.log('Selected service tech:', value);
  };

  useEffect(() => {
      const fetchAppointments = async () => {
      const response = await ManagerServices.getAppointments();
      console.log('Response:', response)
      const appointments = response.data.appointments;
      setAppointments(appointments);
    };

    fetchAppointments();
  }, []);

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Type</th>
          <th>Appointment Status</th>
          <th>Action</th>
          <th>Service Tech</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.customer.properties.first_name}</td>
            <td>{appointment.customer.properties.last_name}</td>
            <td>{appointment.appointment_type}</td>
            <td>{appointment.status}</td>
            <td>
              <Button variant='secondary' onClick={() => handleViewAppointment(appointment)}>View</Button>
              {' '}
              {appointment.status === 'PENDING' && selectedServiceTech[appointment.appointment_id] &&
                <Button onClick={() => handleConfirmAppointment(appointment)}>Confirm</Button>
              }
              {appointment.status === 'PENDING' && appointment.appointment_type === 'TEST_DRIVE' &&
                <Button onClick={() => handleConfirmAppointment(appointment)}>Confirm</Button>
              }
              {' '}
              {appointment.status !== 'CANCELLED' && 
                <Button variant='danger' onClick={() => handleCancelAppointment(appointment)}>Cancel</Button>
              }
            </td>
            {appointment.appointment_type === 'SERVICE' &&
              <td>
                {(appointment.status === 'CONFIRMED' || appointment.status === 'CANCELLED' || selectedServiceTech[appointment.appointment_id]) ? 'Mr. Technician' : (
                <Form.Control as="select" value={selectedServiceTech[appointment.appointment_id] || '' } onChange={(e) => handleServiceTechSelect(appointment, e.target.value)}>
                  <option value="">Select...</option>
                  {serviceTechs.map((tech, index) => (
                    <option key={index} value={tech}>{tech}</option>
                  ))}
                </Form.Control>
                )}
              </td>
            }
          </tr>
        ))}
      </tbody>
    </Table>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p><b>First Name: </b>{selectedAppointment.customer.properties.first_name}</p>
              <p><b>Last Name: </b>{selectedAppointment.customer.properties.last_name}</p>
              <p><b>Appointment Type: </b>{selectedAppointment.appointment_type}</p>
              <p><b>Status: </b>{selectedAppointment.status}</p>
              <p><b>Start Time: </b>{selectedAppointment.time_slot.properties.start_time}</p>
              <p><b>End Time: </b>{selectedAppointment.time_slot.properties.end_time}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentComponent;
