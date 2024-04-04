import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

const AppointmentComponent = ({ appointments, serviceTechs }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedServiceTech, setSelectedServiceTech] = useState('');

  const handleViewAppointment = (appointment) => {
    // Handle view appointment logic
    console.log('View appointment:', appointment);
  };

  const handleConfirmAppointment = (appointment) => {
    // Handle confirm appointment logic
    console.log('Confirm appointment:', appointment);
  };

  const handleServiceTechSelect = (appointment, tech) => {
    // Handle service tech select logic
    console.log('Selected service tech:', tech);
    setSelectedServiceTech(tech);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Type</th>
          <th>Action</th>
          {appointments.some(appointment => appointment.type === 'service') && <th>Service Tech</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={index}>
            <td>{appointment.firstName}</td>
            <td>{appointment.lastName}</td>
            <td>{appointment.type}</td>
            <td>
              <Button onClick={() => handleViewAppointment(appointment)}>View</Button>{' '}
              <Button onClick={() => handleConfirmAppointment(appointment)}>Confirm</Button>
            </td>
            {appointment.type === 'service' &&
              <td>
                <Form.Control as="select" value={selectedServiceTech} onChange={(e) => handleServiceTechSelect(appointment, e.target.value)}>
                  <option value="">Select...</option>
                  {serviceTechs.map((tech, index) => (
                    <option key={index} value={tech}>{tech}</option>
                  ))}
                </Form.Control>
              </td>
            }
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentComponent;
