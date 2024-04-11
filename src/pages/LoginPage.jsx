import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import DateOfBirthPicker from '../components/DateofBirthPicker'; // Import the DateOfBirthPicker component

function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        firstName: '',
        lastName: '',
        driverLicenseNum: '',
        dateOfBirth: ''
    });
    const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (showSignUp) {
                // Sign Up
                const response = await axios.post('/customer/register', formData);
                console.log(response.data); // Handle response as needed
                setSignupSuccess(true); // Set signup success state to true
            } else {
                // Login
                const response = await axios.post('/customer/login', formData);
                console.log(response.data); // Handle response as needed
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url('/cars/carbackground.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh'
            }}
        >
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} style={{ width: '600px', height: '600px', border: '2px solid blueviolet', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
                    </div>
                    {signupSuccess && ( // Render success message if signupSuccess is true
                        <Alert variant="success">User created successfully!</Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>
                        {showSignUp && (
                            <>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Enter Username" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicDateofBirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <DateOfBirthPicker
                                        selectedDate={formData.dateOfBirth}
                                        handleChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                                    />
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
