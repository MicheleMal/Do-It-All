import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Benvenuti sulla nostra Todo App!
                            </Card.Title>
                            <Card.Text>
                                Questo è il posto ideale per organizzare e
                                gestire le tue attività quotidiane. Puoi
                                facilmente aggiungere, modificare ed eliminare i
                                tuoi compiti e tenere traccia del loro stato di
                                completamento.
                            </Card.Text>
                            <Card.Text>
                                Per iniziare, effettua il login o crea un
                                account personale.
                            </Card.Text>
                            <Link to="/login">
                                <button className="btn btn-primary">
                                    Accedi
                                </button>
                            </Link>{" "}
                            <Link to="/registration">
                                <button className="btn btn-secondary">
                                    Registrati
                                </button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
