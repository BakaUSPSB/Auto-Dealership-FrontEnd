//App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Row, Col, Card, Button } from "react-bootstrap";
import IndexPage from "./pages/IndexPage";
import VehiclesPage from './pages/VehiclesPage';
import ServicePage from './pages/ServicePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';



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

    return (
        <div className="bg-gray">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                        Wheels4Steals
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/vehicles'>Vehicles</Nav.Link>
                            <Nav.Link as={Link} to='/service'>Service</Nav.Link>
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Define other routes here */}
            </Routes>
        </div>
    );
}

export default App;
