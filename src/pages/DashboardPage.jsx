import { React, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Garage from "../components/garage_card";
import AppointmentCard from "../components/view_appointments_card";
import PurchaseHistoryCard from "../components/past_purchases_card";
import NegotiationTable from "../components/negotiations";

const DashboardPage = () => {
  const mockVehicles = [
    { make: "Toyota", model: "Camry", year: 2018 },
    { make: "Honda", model: "Civic", year: 2017 },
    // Add more vehicles as needed
  ];
  const purchases = [
    {
      vehicle: "Toyota Camry",
      price: 25000,
      date: "2023-05-15",
      paymentMethod: "Financed",
    },
    {
      vehicle: "Honda Civic",
      price: 22000,
      date: "2023-02-10",
      paymentMethod: "Check",
    },
    // Add more purchases as needed
  ];
  const appointments = [
    { type: "Service", date: "2024-04-05", time: "10:00 AM" },
    { type: "Test Drive", date: "2024-04-08", time: "2:30 PM" },
    // Add more appointments as needed
  ];

  const [selectedComponent, setSelectedComponent] = useState("garage");

  return (
    // <Container fluid>
    //   <Row>
    //     <Col xs={12} md={6}>
    //       {/* Left Quadrant */}
    //       <Container fluid className="quadrant">
    //         <AppointmentCard appointments={appointments}></AppointmentCard>
    //       </Container>
    //     </Col>
    //     <Col xs={12} md={6}>
    //       {/* Right Quadrant */}
    //       <Row>
    //         <Col xs={12} md={6}>
    //           <Container fluid className="quadrant">

    //             <Garage vehicles={mockVehicles}></Garage>
    //           </Container>
    //         </Col>

    //       </Row>
    //           <Container fluid className="quadrant">
    //             <PurchaseHistoryCard purchases={purchases}></PurchaseHistoryCard>

    //           </Container>

    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xs={12}>
    //       {/* Additional row if needed */}
    //     </Col>
    //   </Row>
    // </Container>
    <Container fluid>
      <Nav
        variant="tabs"
        defaultActiveKey="garage"
        onSelect={(key) => setSelectedComponent(key)}
      >
        <Nav.Item>
          <Nav.Link eventKey="garage">Garage</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="purchaseHistory">Purchase History</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="appointments">Appointments</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="negotiations">Negotiations</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container fluid className="quadrant">
        {selectedComponent === "garage" && <Garage vehicles={mockVehicles} />}
        {selectedComponent === "purchaseHistory" && (
          <PurchaseHistoryCard purchases={purchases} />
        )}
        {selectedComponent === "appointments" && (
          <AppointmentCard appointments={appointments} />
        )}
        {selectedComponent === "negotiations" && <NegotiationTable />}
      </Container>
    </Container>
  );
};

export default DashboardPage;
