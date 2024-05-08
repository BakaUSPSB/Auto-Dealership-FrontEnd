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

        </Container>
    );
}

export default LoginPage;
