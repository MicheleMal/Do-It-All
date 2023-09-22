import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormRegister = () => {
    const navigate = useNavigate();

    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [registrationInfo, setRegistrationInfo] = useState({
        message: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRegister({
            ...register,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/register",
                {
                    username: register.username,
                    email: register.email,
                    password: register.password,
                }
            );

            if (res.status === 201) {
                // setRegistrationInfo({
                //     message: res.data.message,
                //     status: "success",
                // });
                // console.log(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            if (error.response.status === 409) {
                setRegistrationInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
                // console.log(error.response.data.message);
            }
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="p-4 bg-light rounded shadow">
                        <h2 className="text-center mb-4">Benvenuto</h2>

                        <Alert
                            key={registrationInfo.status}
                            variant={registrationInfo.status}
                        >
                            {registrationInfo.message}
                        </Alert>
                        <Form autoComplete="off" onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Inserisci il tuo username"
                                    name="username"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mt-2"
                                controlId="formUsername"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Inserisci il tuo indirizzo email"
                                    name="email"
                                    onChange={handleChange}
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
                                />
                            </Form.Group>

                            <Button
                                className="mt-3"
                                variant="primary"
                                type="submit"
                            >
                                Registrati
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <Link to="/login">
                                Hai già un account. Effettua il login qui.
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default FormRegister;
