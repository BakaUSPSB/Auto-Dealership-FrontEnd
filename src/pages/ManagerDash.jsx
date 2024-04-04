import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Appointments from "../components/appointments.jsx"
import PoliciesTable from '../components/policies.jsx';
import NegotiationTable from '../components/negotiations.jsx';
import CarForm from '../components/updateVehicles.jsx';

const mockAppointments = [
    { firstName: 'John', lastName: 'Doe', type: 'test drive' },
    { firstName: 'Jane', lastName: 'Smith', type: 'service' },
    { firstName: 'Michael', lastName: 'Johnson', type: 'test drive' },
    { firstName: 'Emily', lastName: 'Williams', type: 'service' },
    { firstName: 'David', lastName: 'Brown', type: 'test drive' },
    // Add more appointments as needed
  ];
  
  const mockServiceTechs = [
    'Adam Smith',
    'Eva Johnson',
    'Matthew Wilson',
    'Olivia Taylor',
    // Add more service techs as needed
  ];




const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={6}>
          {/* Top Left Quadrant */}
          <Container fluid className="quadrant">
            <Appointments appointments={mockAppointments} serviceTechs={mockServiceTechs}></Appointments>
          </Container>
        </Col>
        <Col xs={6} md={6}>
          {/* Top Right Quadrant */}
          <Container fluid className="quadrant">
            <PoliciesTable></PoliciesTable>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={6}>
          {/* Bottom Left Quadrant */}
          <Container fluid className="quadrant">
            <CarForm></CarForm>
          </Container>
        </Col>
        <Col xs={6} md={6}>
          {/* Bottom Right Quadrant */}
          <Container fluid className="quadrant">
            <NegotiationTable></NegotiationTable>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
