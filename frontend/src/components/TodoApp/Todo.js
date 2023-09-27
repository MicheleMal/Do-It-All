import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const Todo = ({
    todo,
    editing,
    startEditTodo,
    cancelEditTodo,
    saveModifyTodo,
    deleteTodo,
    newTodo,
    setNewTodo,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewTodo({
            ...newTodo,
            [name]: value,
        });
    };

    return (
        <Container>
            {editing ? (
                <div>
                    <Form autoComplete="off">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={newTodo.title}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={newTodo.description}
                            />
                        </Form.Group>
                    </Form>

                    <Button
                        variant="success"
                        onClick={() => saveModifyTodo(todo._id, newTodo)}
                    >
                        Salva
                    </Button>
                    <Button variant="secondary" onClick={cancelEditTodo}>Annulla</Button>
                </div>
            ) : (
                <div>
                    <h4>{todo.title}</h4>
                    <p>{todo.description}</p>
                    <Button
                        variant="primary"
                        onClick={() => startEditTodo(todo._id)}
                    >
                        Modifica
                    </Button>
                    <Button variant="danger" onClick={()=>deleteTodo(todo._id)}>Elimina</Button>
                </div>
            )}
        </Container>
    );
};

export default Todo;
