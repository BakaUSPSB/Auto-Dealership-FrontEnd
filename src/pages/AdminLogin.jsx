import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import adminLoginService from '../services/adminLoginService';

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [signupError, setSignupError] = useState('');
    
    
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminLoginService.login(formData.email, formData.password);
            if (response.code === 200) {
                    // Store the token in local storage
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('id',response.data.customer_id);
                    localStorage.setItem('firstName',response.data.first_name);
                    if(!response.data.role){
                        localStorage.setItem('role','customer');
                    }else{
                        localStorage.setItem('role',response.data.role);
                    }
                    // Redirect to the home page
                    sleep(500).then(() => {window.location.href = '/';})
                }
                if(response.code === 400){
                    setSignupError(response.message);
                }
            } catch (error) {
                console.error(error);
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
                        <h2>Login</h2>
                    </div>
                    {signupError && (
    <Alert variant="danger" style={{ fontSize: '12px', padding: '8px' }}>{signupError}</Alert>
)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Email Username</Form.Label>
                            <Form.Control type="username" name="email" placeholder="Enter User" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" block>
                            Login
                        </Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    );
}

export default AdminLogin;
