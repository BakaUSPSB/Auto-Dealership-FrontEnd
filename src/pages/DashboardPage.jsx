import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Garage from '../components/garage_card';
import AppointmentCard from '../components/view_appointments_card';
import PurchaseHistoryCard from '../components/past_purchases_card';


const mockVehicles = [
  { make: 'Toyota', model: 'Camry', year: 2018 },
  { make: 'Honda', model: 'Civic', year: 2017 },
  { make: 'Ford', model: 'F-150', year: 2020 },
  { make: 'Chevrolet', model: 'Silverado', year: 2019 },
  { make: 'BMW', model: 'X5', year: 2016 },
  { make: 'Mercedes-Benz', model: 'C-Class', year: 2015 },
  { make: 'Audi', model: 'A4', year: 2019 },
  { make: 'Tesla', model: 'Model S', year: 2021 },
  { make: 'Nissan', model: 'Altima', year: 2019 },
  { make: 'Subaru', model: 'Outback', year: 2017 },
  // Add more vehicles as needed
];

const purchases = [
  { vehicle: 'Toyota Camry', price: 25000, date: '2023-05-15', paymentMethod: 'Financed' },
  { vehicle: 'Honda Civic', price: 22000, date: '2023-02-10', paymentMethod: 'Check' },
  // Add more purchases as needed
];



  const appointments = [
    { type: 'Service', date: '2024-04-05', time: '10:00 AM' },
    { type: 'Test Drive', date: '2024-04-08', time: '2:30 PM' },
    // Add more appointments as needed
  ];

const DashboardPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          {/* Left Quadrant */}
          <Container fluid className="quadrant">
            <AppointmentCard appointments={appointments}></AppointmentCard>
          </Container>
        </Col>
        <Col xs={12} md={6}>
          {/* Right Quadrant */}
          <Row>
            <Col xs={12} md={6}>
              <Container fluid className="quadrant">

                <Garage vehicles={mockVehicles}></Garage>
              </Container>
            </Col>
           
          </Row>
              <Container fluid className="quadrant">
                <PurchaseHistoryCard purchases={purchases}></PurchaseHistoryCard>

              </Container>


        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {/* Additional row if needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;