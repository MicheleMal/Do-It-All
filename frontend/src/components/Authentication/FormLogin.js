import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLogin({
            ...login,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/login",
                {
                    username: login.username,
                    password: login.password,
                },
                { withCredentials: true }
            );

            if (res.status === 200) {
                navigate("/profile");
            }
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.message);
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="p-4 bg-light rounded shadow">
                        <h2 className="text-center mb-4">Benvenuto</h2>
                        <Form
                            method="POST"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Inserisci il tuo username"
                                    name="username"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mt-2"
                                controlId="formPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Inserisci la tua password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button
                                className="mt-3"
                                variant="primary"
                                type="submit"
                            >
                                Accedi
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <Link to="/registration">
                                Non hai un account? Registrati qui.
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
