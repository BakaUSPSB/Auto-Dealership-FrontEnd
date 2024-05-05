import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import DateOfBirthPicker from "../DateofBirthPicker";
import LoginService from "../../services/loginService";

const LoginForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        driverLicenseNum: "",
        dateOfBirth: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [driverLicenseError, setDriverLicenseError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateDriverLicense = (driverLicense) =>
        /^[A-Za-z][0-9]{14}$/.test(driverLicense);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
        setPasswordError(value !== formData.password ? "Passwords do not match" : "");
    };

    const handleDriverLicenseChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, driverLicenseNum: value });
        setDriverLicenseError(!validateDriverLicense(value) ? "Invalid driver's license number format" : "");
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, email: value });
        setEmailError(!validateEmail(value) ? "Invalid email format" : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            if (formData.password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            }
            if (!validateEmail(formData.email)) {
                setEmailError("Invalid email format");
                return;
            }
            if (!validateDriverLicense(formData.driverLicenseNum)) {
                setDriverLicenseError("Invalid driver's license number format");
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
                if (response.code === 400) {
                    setSignupSuccess(false);
                    setSignupError(response.message);
                } else if (response.code === 201) {
                    setSignupSuccess(true);
                    setIsSignUp(false);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            if (!validateEmail(formData.email)) {
                setEmailError("Invalid email format");
                return;
            }
            try {
                const response = await LoginService.login(
                    formData.email,
                    formData.password
                );
                if (response.code === 200) {
                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem("id", response.data.customer_id);
                    localStorage.setItem("firstName", response.data.first_name);
                    localStorage.setItem("role", response.data.role || "customer");
                    onSuccess();
                } else if (response.code === 400) {
                    setSignupSuccess(false);
                    setSignupError(response.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const toggleForm = () => setIsSignUp(!isSignUp);

    return (
        <Row className=" align-items-center min-vh-100">
            <Col xs={12} md={6} lg={5}>
                <Form onSubmit={handleSubmit} style={{
                    padding: "20px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    border: "2px solid #8a00ff",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    width: 500
                }}>
                    <div className="text-center mb-4">
                        <h2 style={{ color: "#8a00ff" }}>{isSignUp ? "Sign Up" : "Login"}</h2>
                    </div>
                    {signupSuccess && (
                        <Alert variant="success">
                            User created successfully!
                        </Alert>
                    )}
                    {signupError && (
                        <Alert variant="danger">
                            {signupError}
                        </Alert>
                    )}

                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleEmailChange}
                            value={formData.email}
                        />
                        {emailError && (
                            <Alert variant="danger" style={{ fontSize: "12px", padding: "8px", marginTop: "5px" }}>
                                {emailError}
                            </Alert>
                        )}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </Form.Group>

                    {isSignUp && (
                        <>
                            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={handleConfirmPasswordChange}
                                    value={confirmPassword}
                                />
                                {passwordError && (
                                    <Alert
                                        variant="danger"
                                        style={{ fontSize: "12px", padding: "8px", marginTop: "5px" }}
                                    >
                                        {passwordError}
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formBasicFirstName" className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicLastName" className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDateofBirth" className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <br/>
                                <DateOfBirthPicker
                                    selectedDate={formData.dateOfBirth}
                                    handleChange={(date) => {
                                        const formattedDate = date.toISOString().split("T")[0];
                                        setFormData({ ...formData, dateOfBirth: formattedDate });
                                    }}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDriverLicense" class="mb-3">
                                <Form.Label>Driver's License Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="driverLicenseNum"
                                    placeholder="Enter Driver's License Number"
                                    onChange={handleDriverLicenseChange}
                                    value={formData.driverLicenseNum}
                                />
                                {driverLicenseError && (
                                    <Alert
                                        variant="danger"
                                        style={{ fontSize: "12px", padding: "8px", marginTop: "5px" }}
                                    >
                                        {driverLicenseError}
                                    </Alert>
                                )}
                            </Form.Group>
                        </>
                    )}

                    <Button variant="primary" type="submit" block style={{ backgroundColor: "#8a00ff", borderColor: "#8a00ff", width: "100%" }}>
                        {isSignUp ? "Sign Up" : "Login"}
                    </Button>

                    <div className="text-center mt-3">
                        <Button variant="link" onClick={toggleForm} style={{ color: "#8a00ff" }}>
                            {isSignUp ? "Back to Login" : "Sign Up"}
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginForm;
