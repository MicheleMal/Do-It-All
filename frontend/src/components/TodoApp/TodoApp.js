import { Col, Container, Row, Alert } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

export const TodoApp = () => {
    const [cookies] = useCookies(["jwtToken"]);
    const [todos, setTodos] = useState([]);
    const [showInfo, setshowInfo] = useState({
        message: "",
        status: "",
    });
    const [editingTodo, setEditingTodo] = useState(null);
    const [newTodo, setNewTodo] = useState({
        title: "",
        description: "",
    });

    const getAllTodos = async () => {
        try {
            const res = await axios.get(
                // "http://localhost:5000/todo/get", 
                "https://doitall.onrender.com/todo/get",
            {
                headers: {
                    Authorization: `Bearer ${cookies.jwtToken}`,
                },
            });

            if (res.status === 200) {
                setTodos(res.data.data);
            }
        } catch (error) {
            if (error.response.status === 404) {
                setshowInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    // Function that adds a new everything
    const onAddTodo = async (newTodo) => {
        // console.log(newTodo);
        try {
            const res = await axios.post(
                // "http://localhost:5000/todo/add",
                "https://doitall.onrender.com/todo/add",
                newTodo,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status === 201) {
                setshowInfo({
                    message: res.data.message,
                    status: "success",
                });
                getAllTodos();
            }
        } catch (error) {
            if (error.response.status === 400) {
                setshowInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    // Function that allows the modification of the todo
    const startEditTodo = (idTodo) => {
        const currentTodo = todos.find((todo) => todo._id === idTodo);
        setNewTodo({
            title: currentTodo.title,
            description: currentTodo.description,
        });
        setEditingTodo(idTodo);
    };

    // Function that cancels the todo modification
    const cancelEditTodo = () => {
        setEditingTodo(null);
    };

    // Function that modifies the todo
    const onSaveModifyTodo = async (id, newTodo) => {
        try {
            const res = await axios.patch(
                // `http://localhost:5000/todo/modify/${id}`
                `https://doitall.onrender.com/todo/modify/${id}`,
                newTodo,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status === 200) {
                setshowInfo({
                    message: res.data.message,
                    status: "success",
                });
            }
            setEditingTodo(null);
            getAllTodos();
        } catch (error) {
            if (error.response.status === 404) {
                setshowInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    // Function that eliminates todo
    const onDeleteTodo = async (id) => {
        try {
            const res = await axios.delete(
                // `http://localhost:5000/todo/delete/${id}`,
                `https://doitall.onrender.com/todo/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status === 200) {
                setshowInfo({
                    message: res.data.message,
                    status: "success",
                });

                if (todos.length === 1) {
                    setTodos([]);
                }

                getAllTodos();
            }
        } catch (error) {
            if (error.response.status === 404) {
                setshowInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    // Function that completes or incompletes the todo
    const onCompleteTodo = async (id) => {
        try {
            const res = await axios.patch(
                // `http://localhost:5000/todo/completed/${id}`,
                `https://doitall.onrender.com/todo/completed/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status === 200) {
                setshowInfo({
                    message: res.data.message,
                    status: "success",
                });
                getAllTodos();
            }
        } catch (error) {
            if (error.response.status === 404) {
                setshowInfo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    const getTodoCalled = useRef(false);
    useEffect(() => {
        if (getTodoCalled.current) return;
        getTodoCalled.current = true;
        getAllTodos();
    }, []);

    return (
        <Container>
            {showInfo.message && (
                <Alert key={showInfo.status} variant={showInfo.status}>
                    {showInfo.message}
                </Alert>
            )}
            <h2>Lista dei Todo</h2>
            <Row>
                <Col>
                    <TodoForm onAddTodo={onAddTodo} info={showInfo} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TodoList
                        todos={todos}
                        editingTodo={editingTodo}
                        startEditTodo={startEditTodo}
                        cancelEditTodo={cancelEditTodo}
                        onSaveModifyTodo={onSaveModifyTodo}
                        onDeleteTodo={onDeleteTodo}
                        onCompleteTodo={onCompleteTodo}
                        newTodo={newTodo}
                        setNewTodo={setNewTodo}
                    />
                </Col>
            </Row>
        </Container>
    );
};
export default TodoApp;
