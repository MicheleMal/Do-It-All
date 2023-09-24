import { useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

//TODO: Sistemare aggiornamento informazioni account

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [showInfo, setShowInfo] = useState({
        message: "",
        status: ""
    })
    const [cookies,,removeCookie] = useCookies(["jwtToken"]);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/user/profile", {
                headers: { Authorization: `Bearer ${cookies.jwtToken}` },
            });

            if (res.status === 200) {
                setUser(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataCalled = useRef(false);
    useEffect(() => {
        if (fetchDataCalled.current) return;
        fetchDataCalled.current = true;
        fetchData();
    }, []);

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
                "http://localhost:5000/user/update",
                user,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status===200) {
                removeCookie("jwtToken", {expires: new Date(0)})
                navigate("/login")
            }
        } catch (error) {
            if (error.response.status === 409) {
                setShowInfo({
                    message: error.response.data.message,
                    status: "danger"
                })
                // console.log(error.response.data.message);
            }
            console.error(error);
        }
    };

    return (
        <Container>
            <h1>Profilo Utente</h1>
            <Row>
                <Col md={6}>
                {
                showInfo.message &&(
                    <Alert key={showInfo.status} variant={showInfo.status}>
                        {showInfo.message}
                    </Alert>
                )
            }
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
                </Col>
                <Col md={6}></Col>
            </Row>
        </Container>
    );
};

export default Profile;
