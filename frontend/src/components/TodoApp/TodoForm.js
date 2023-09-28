import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const TodoForm = ({ onAddTodo }) => {
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
            onAddTodo(newTodo);
            setNewTodo({
                title: "",
                description: ""
            })
        }
    };

    return (
        <Card className="mt-4 mb-4">
            <Card.Body>
                <h2>Aggiungi Todo</h2>

                <Form autoComplete="off">
                    <Form.Group>
                        <Form.Control
                            className="mt-4"
                            type="text"
                            name="title"
                            value={newTodo.title}
                            onChange={handleChange}
                            placeholder="Inserisci titolo todo"
                            required
                        />
                        <Form.Control
                            className="mt-4 mb-4"
                            type="text"
                            name="description"
                            value={newTodo.description}
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
