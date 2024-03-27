import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import IndexPage from "./pages/IndexPage";
import StorePage from './pages/StorePage';
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
                            <Nav.Link as={Link} to='/films'>Store</Nav.Link>
                            <Nav.Link as={Link} to='/customers'>Vehicles</Nav.Link>
                            <Nav.Link as={Link} to='/films'>Service</Nav.Link>
                            <Nav.Link as={Link} to='/customers'>Login</Nav.Link>
                            <Nav.Link as={Link} to='/customers'>Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/films" element={<StorePage />} />
                <Route path="/customers" element={<VehiclesPage />} />
                <Route path="/customers" element={<ServicePage />} />
                <Route path="/customers" element={<LoginPage />} />
                <Route path="/customers" element={<DashboardPage />} />

                {/* Define other routes here */}
            </Routes>
        </div>
    );
}

export default App;
