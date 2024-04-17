import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import DateOfBirthPicker from '../components/DateofBirthPicker';
import LoginService from '../services/loginService';

function LoginPage() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        driverLicenseNum: '',
        dateOfBirth: ''
    });
    const [emailError, setEmailError] = useState('');
    const [confirmPassword,setConfirmPassword] = useState(''); // New state for confirm password
    const [passwordError, setPasswordError] = useState(''); // New state for password error
    const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
    const [driverLicenseError, setDriverLicenseError] = useState('');

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // New function to handle confirm password change
    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
        if (value !== formData.password) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };
    const validateEmail = (email) => {
        // Regular expression for email validation
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return isValidEmail;
    };

    // Function to handle email change
    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, email: value });
        if (value && !validateEmail(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (showSignUp) {
            if (formData.password !== confirmPassword) {
                setPasswordError('Passwords do not match');
                return;
            }
            if (!validateEmail(formData.email)) {
                setEmailError('Invalid email format');
                return;
            }
            if (!validateDriverLicense(formData.driverLicenseNum)) {
                setDriverLicenseError('Invalid driver\'s license number format');
                return;
            }
            try {
                const response = await LoginService.signup(
                    formData.firstName,
                    formData.lastName,
                    formData.email,
                    formData.password,
                    formData.dateOfBirth,
                    formData.driverLicenseNum
                );
                if (response) {
                    setSignupSuccess(true);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            if (!validateEmail(formData.email)) {
                setEmailError('Invalid email format');
                return;
            }
            try {
                const response = await LoginService.login(formData.email, formData.password);
                if (response) {
                    // Store the token in local storage
                    localStorage.setItem('token', response.token);
                    // Redirect to the home page
                    window.location.href = '/';
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    // Function to validate driver's license number
    const validateDriverLicense = (driverLicense) => {
        // Check if the driver's license number is in the correct format for New Jersey
        const isValidLicense = /^[A-Za-z][0-9]{14}$/.test(driverLicense);
        return isValidLicense;
    };
    // Function to handle driver's license number change
    const handleDriverLicenseChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, driverLicenseNum: value });
        if (value && !validateDriverLicense(value)) {
            setDriverLicenseError('Invalid driver\'s license number format');
        } else {
            setDriverLicenseError('');
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
                <Col xs={12} md={6} style={{ width: '800px', height: '800px', border: '2px solid blueviolet', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-4">
                        <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
                    </div>
                    {signupSuccess && ( // Render success message if signupSuccess is true
                        <Alert variant="success" style={{ fontSize: '12px', padding: '8px' }}>User created successfully!</Alert>)}
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
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
