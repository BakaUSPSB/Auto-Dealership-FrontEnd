// src/pages/LoginPage.js

import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import LoginForm from "../components/authentication/loginForm";

function LoginPage() {
    const handleSuccessfulLogin = () => {
        window.location.href = "/";
    };

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url('/assets/blur.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
                backgroundColor: '#1c1c1c'
            }}
        >

            <LoginForm onSuccess={handleSuccessfulLogin}/>

                backgroundImage: `url('/cars/carbackground.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh'
            }}
        >
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} style={{ width: '800px', height: '800px', border: '2px solid blueviolet', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
                    </div>
                    {signupSuccess && ( // Render success message if signupSuccess is true
                        <Alert variant="success" style={{ fontSize: '12px', padding: '8px' }}>User created successfully!</Alert>)}
                    {signupError && (
    <Alert variant="danger" style={{ fontSize: '12px', padding: '8px' }}>{signupError}</Alert>
)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleEmailChange} />
                            {emailError && (
                                <Alert variant="danger" style={{ fontSize: '12px', padding: '8px', marginTop: '5px' }}>{emailError}</Alert>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>
                        {showSignUp && (
                            <>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
                                    {passwordError && (
                                        <Alert variant="danger" style={{ fontSize: '12px', padding: '8px', marginTop: '5px' }}>{passwordError}</Alert>
                                    )}
                                </Form.Group>
                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstName" placeholder="Enter First Name" onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" placeholder="Enter Last Name" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="formBasicDateofBirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <br></br>
                                    <DateOfBirthPicker
                                        selectedDate={formData.dateOfBirth}
                                        handleChange={(date) => {
                                            const formattedDate = date.toISOString().split('T')[0];
                                            setFormData({ ...formData, dateOfBirth: formattedDate });
                                        }}                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicDriverLicense">
                                    <Form.Label>Driver's License Number</Form.Label>
                                    <Form.Control type="text" name="driverLicenseNum" placeholder="Enter Driver's License Number" onChange={handleDriverLicenseChange} />
                                    {driverLicenseError && (
                                        <Alert variant="danger" style={{ fontSize: '12px', padding: '8px', marginTop: '5px' }}>{driverLicenseError}</Alert>
                                    )}
                                </Form.Group>
                            </>
                        )}
                        <br></br>
                        <Button variant="primary" type="submit" block>
                            {showSignUp ? 'Sign Up' : 'Login'}
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Button variant="link" onClick={toggleForm}>
                            {showSignUp ? 'Back to Login' : 'Sign Up'}
                        </Button>
                        {!showSignUp && (
                            <Button variant='link' onClick={() => window.location.href = '/admin_login'}>
                                Employee Login
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
