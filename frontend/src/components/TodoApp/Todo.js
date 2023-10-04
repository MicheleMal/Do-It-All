import { useState } from "react";
import { Form, Button, Container, Badge } from "react-bootstrap";

const Todo = ({
    todo,
    editing,
    startEditTodo,
    cancelEditTodo,
    onSaveModifyTodo,
    onDeleteTodo,
    onCompleteTodo,
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
        <div>
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
                        onClick={() => onSaveModifyTodo(todo._id, newTodo)}
                        className="mt-3"
                    >
                        Salva
                    </Button>
                    <Button variant="secondary" onClick={cancelEditTodo} className="mt-3">
                        Annulla
                    </Button>
                </div>
            ) : (
                <div>
                    <Badge bg={todo.completed ? "success" : "secondary"}>
                        {todo.completed ? "completato" : "non completato"}
                    </Badge>
                    <h4 className="mt-2">{todo.title}</h4>
                    <p>{todo.description}</p>
                    <Button
                        variant="primary"
                        onClick={() => startEditTodo(todo._id)}
                    >
                        Modifica
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onDeleteTodo(todo._id)}
                    >
                        Elimina
                    </Button>
                    <Form.Check
                        type="checkbox"
                        className="mt-3"
                        label={todo.completed ? "Non completato" : "Completa"}
                        checked={todo.completed}
                        onChange={() => onCompleteTodo(todo._id)}
                    />
                </div>
            )}
        </div>
    );
};

export default Todo;
