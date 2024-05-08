import { React, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import CreateUsersForm from "../components/createUsers.jsx";
import ViewUsers from "../components/viewUsers.jsx";

const AdminDashboard = () => {
  // Component logic and JSX here
  const [selectedComponent, setSelectedComponent] = useState("createUser");

  return (
    <Container fluid>
      <Nav
        variant="tabs"
        defaultActiveKey="createUser"
        onSelect={(key) => setSelectedComponent(key)}
      >
        <Nav.Item>
          <Nav.Link eventKey="createUser">Create user</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="viewUsers">View users</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container fluid className="quadrant">
        {selectedComponent === "createUser" && <CreateUsersForm />}
        {selectedComponent === "viewUsers" && <ViewUsers />}
      </Container>
    </Container>
  );
};

export default AdminDashboard;
