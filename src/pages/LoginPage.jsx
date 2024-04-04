import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false);

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <Container
            fluid // Ensure full-width container
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url('/cars/carbackground.jpg')`, // Path to the image from the public directory
                backgroundSize: 'cover', // Cover the entire page
                backgroundPosition: 'center', // Center the image
                backgroundAttachment: 'fixed', // Keep the image fixed while scrolling
                minHeight: '100vh' // Ensure minimum height of the viewport
            }}
        >
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} style={{ width: '600px', height: '600px', border: '2px solid blueviolet', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        {showSignUp && (
                            <>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" />
                                </Form.Group>
                            </>
                        )}
                        <Button variant="primary" type="submit" block>
                            {showSignUp ? 'Sign Up' : 'Login'}
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Button variant="link" onClick={toggleForm}>
                            {showSignUp ? 'Back to Login' : 'Sign Up'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
