import { React, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Appointments from "../components/appointments.jsx";
import PoliciesTable from "../components/policies.jsx";
import NegotiationTable from "../components/negotiations.jsx";
import CarForm from "../components/updateVehicles.jsx";
import MonthlySalesReport from "../components/monthlySalesReport.jsx";
import ManagerServiceMenu from "../components/Managerservices.jsx";
import ManagerContracts from "../components/ManagerContracts.jsx";
// import ManagerCredit from "../components/ManagerCredit.jsx";
import ManagerAddonMenu from "../components/ManagerAddons.jsx";

const Dashboard = () => {
  const mockAppointments = [
    { firstName: "John", lastName: "Doe", type: "test drive" },
    { firstName: "Jane", lastName: "Smith", type: "service" },
    { firstName: "Michael", lastName: "Johnson", type: "test drive" },
    { firstName: "Emily", lastName: "Williams", type: "service" },
    { firstName: "David", lastName: "Brown", type: "test drive" },
    // Add more appointments as needed
  ];

  const mockServiceTechs = [
    "Adam Smith",
    "Eva Johnson",
    "Matthew Wilson",
    "Olivia Taylor",
    // Add more service techs as needed
  ];
  const [selectedComponent, setSelectedComponent] = useState("negotiations");

  return (
    <Container fluid>
      <Nav
        variant="tabs"
        defaultActiveKey="negotiations"
        onSelect={(key) => setSelectedComponent(key)}
      >
        <Nav.Item>
          <Nav.Link eventKey="negotiations">Negotiations</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Appointments">Appointments</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Policies">Policies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="addCar">Update Inventory</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="MonthlySalesReport">Monthly Sales Report</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="ManagerServiceMenu">Manager Service Menu</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="ManagerContracts">Manager Contracts</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey="ManagerCredit">Manager Credit</Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link eventKey="ManagerAddonMenu">Manager Addon Menu</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container fluid className="quadrant">
        {selectedComponent === "negotiations" && <NegotiationTable />}
        {selectedComponent === "Appointments" && (
          <Appointments
            appointments={mockAppointments}
            serviceTechs={mockServiceTechs}
          />
        )}
        {selectedComponent === "Policies" && <PoliciesTable />}
        {selectedComponent === "addCar" && <CarForm />}
        {selectedComponent === "MonthlySalesReport" && <MonthlySalesReport />}
        {selectedComponent === "ManagerServiceMenu" && <ManagerServiceMenu />}
        {selectedComponent === "ManagerContracts" && <ManagerContracts />}
        {/* {selectedComponent === "ManagerCredit" && <ManagerCredit />} */}
        {selectedComponent === "ManagerAddonMenu" && <ManagerAddonMenu />}
      </Container>
    </Container>
  );
};

export default Dashboard;
