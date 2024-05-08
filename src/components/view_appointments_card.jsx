import React from 'react';
import { Card, Table } from 'react-bootstrap';

const AppointmentCard = ({ appointments }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Appointments</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointment.type}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
