import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const TodoForm = ({ addTodo }) => {
    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    const handleAddTodo = () => {
        if (newTodo.description.trim() !== "" && newTodo.title.trim() !== "") {
            addTodo(newTodo);
        }
    };

    return (
        <Card>
            <Card.Body>
                <h2>Aggiungi Todo</h2>

                <Form autoComplete="off">
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="title"
                            onChange={handleChange}
                            placeholder="Inserisci titolo todo"
                            required
                        />
                        <Form.Control
                            type="text"
                            name="description"
                            onChange={handleChange}
                            placeholder="Inserisci descrizione todo"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddTodo}>
                        Aggiungi
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default TodoForm;
