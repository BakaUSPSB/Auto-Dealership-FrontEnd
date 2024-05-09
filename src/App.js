//App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import PurchasePage from "./pages/PurchasePage";

const mockCars = [
  { make: "Toyota", model: "Camry", year: 2018 },
  { make: "Honda", model: "Civic", year: 2017 },
  { make: "Ford", model: "F-150", year: 2020 },
  { make: "Chevrolet", model: "Silverado", year: 2019 },
  { make: "BMW", model: "X5", year: 2016 },
  { make: "Mercedes-Benz", model: "C-Class", year: 2015 },
  { make: "Audi", model: "A4", year: 2019 },
  { make: "Tesla", model: "Model S", year: 2021 },
  { make: "Nissan", model: "Altima", year: 2019 },
  { make: "Subaru", model: "Outback", year: 2017 },
  // Add more cars as needed
];

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="bg-gray">
      <Navbar style={{ backgroundColor: "#000000" }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Wheels4Stealz
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              {localStorage.getItem("token") ? (
                <>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/purchase/:vehicle_id" element={<PurchasePage />} />
        {/* Define other routes here */}
      </Routes>
    </div>
  );
}

export default App;
