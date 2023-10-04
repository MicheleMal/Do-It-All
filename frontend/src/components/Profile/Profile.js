import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import FormChangeInformation from "./FormChangeInformation";
import TodoApp from "../TodoApp/TodoApp";
import { useNavigate } from "react-router";

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                // "http://localhost:5000/user/profile",
                "https://doitall.onrender.com/user/profile",
                {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
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
        if(!localStorage.getItem("jwtToken")){
            navigate("/login")
        }
        fetchData();
    }, []);

    return (
        <Container>
            <h1>Profilo Utente</h1>
            <Row>
                <Col md={6}>
                    <FormChangeInformation user={user} setUser={setUser} />
                </Col>
                <Col md={6}>
                    <TodoApp />
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
