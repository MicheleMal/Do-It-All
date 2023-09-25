import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import FormChangeInformation from "./FormChangeInformation";

const Profile = () => {
    const [user, setUser] = useState([]);

    const [cookies] = useCookies(["jwtToken"]);

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

    return (
        <Container>
            <h1>Profilo Utente</h1>
            <Row>
                <Col md={6}>
                    <FormChangeInformation user={user} setUser={setUser} />
                </Col>
                <Col md={6}></Col>
            </Row>
        </Container>
    );
};

export default Profile;