import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import adminUsers from "../services/adminUsersService";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = adminUsers.createUsers(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.role
    );
    if (response.code === 201) {
      alert("User created successfully");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select a role</option>
          <option value="1">Admin</option>
          <option value="2">Manager</option>
          <option value="3">Technician</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateUserForm;
