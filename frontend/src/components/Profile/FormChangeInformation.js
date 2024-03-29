import { Container, Alert, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormChangeInformation = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [showInfo, setShowInfo] = useState({
        message: "",
        status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.patch(
                // "http://localhost:5000/user/update",
                "https://doitall.onrender.com/user/update",
                user,
                {
                    headers: {
                        // Authorization: `Bearer ${cookies.jwtToken}`,
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    },
                }
            );

            if (res.status === 200) {
                localStorage.removeItem("jwtToken")
                navigate(
                    "/login?success=Modifiche%20effettuate%20con%20successo"
                );
            }
        } catch (error) {
            if (error.response.status === 409) {
                setShowInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
                // console.log(error.response.data.message);
            }
            console.error(error);
        }
    };

    const handleSubmitLogout = ()=>{
        localStorage.removeItem("jwtToken")
        navigate("/")
    }

    return (
        <Container>
            {showInfo.message && (
                <Alert key={showInfo.status} variant={showInfo.status}>
                    {showInfo.message}
                </Alert>
            )}
            <h3 className>Informazioni dell'Account</h3>
            <Form autoComplete="off" method="OFF" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="mt-3" type="submit" variant="primary">
                    Modifica Informazioni
                </Button>
            </Form>
            <Button className="mt-3" onClick={handleSubmitLogout} variant="danger">
                    Logout
            </Button>
        </Container>
    );
};

export default FormChangeInformation;
