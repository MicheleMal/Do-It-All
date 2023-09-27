import { Col, Container, Row, Alert } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

export const TodoApp = () => {
    const [cookies] = useCookies(["jwtToken"]);
    const [todos, setTodos] = useState([]);
    const [showInfoAddTodo, setShowInfoAddTodo] = useState({
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
            const res = await axios.get("http://localhost:5000/todo/get", {
                headers: {
                    Authorization: `Bearer ${cookies.jwtToken}`,
                },
            });

            if (res.status === 200) {
                setTodos(res.data.data);
            }
        } catch (error) {
            if (error.response.status === 404) {
                setTodos([{
                    title: "",
                    description: ""
                }])
                setShowInfoAddTodo({
                    message: error.response.data.message,
                    status: "danger"
                })
            }
        }
    };

    // Add new todo
    const addTodo = async (newTodo) => {
        // console.log(newTodo);
        try {
            const res = await axios.post(
                "http://localhost:5000/todo/add",
                newTodo,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status === 201) {
                setShowInfoAddTodo({
                    message: res.data.message,
                    status: "success",
                });
                getAllTodos();
            }
        } catch (error) {
            if (error.response.status === 400) {
                setShowInfoAddTodo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    const startEditTodo = (idTodo) => {
        const currentTodo = todos.find((todo) => todo._id === idTodo);
        setNewTodo({
            title: currentTodo.title,
            description: currentTodo.description,
        });
        setEditingTodo(idTodo);
    };

    const cancelEditTodo = () => {
        setEditingTodo(null);
    };

    const saveModifyTodo = async (id, newTodo) => {
        try {
            const res = await axios.patch(
                `http://localhost:5000/todo/modify/${id}`,
                newTodo,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.jwtToken}`,
                    },
                }
            );

            if (res.status === 200) {
                setShowInfoAddTodo({
                    message: res.data.message,
                    status: "success",
                });
            }
            setEditingTodo(null);
            getAllTodos();
        } catch (error) {
            if (error.response.status === 404) {
                setShowInfoAddTodo({
                    message: error.response.data.message,
                    status: "danger",
                });
            }
        }
    };

    const deleteTodo = async (id) =>{
        try {
            const res = await axios.delete(`http://localhost:5000/todo/delete/${id}`, {
                headers:{
                    Authorization: `Bearer ${cookies.jwtToken}`
                }
            })

            if(res.status === 200){
                setShowInfoAddTodo({
                    message: res.data.message,
                    status: "success"
                })
                getAllTodos()
            }
        } catch (error) {
            if(error.response.status===404){
                setShowInfoAddTodo({
                    message: error.response.data.message,
                    status: "danger"
                })
            }
        }
    }

    const getTodoCalled = useRef(false);
    useEffect(() => {
        if (getTodoCalled.current) return;
        getTodoCalled.current = true;
        getAllTodos();
    }, []);

    return (
        <Container>
            {showInfoAddTodo.message && (
                    <Alert key={showInfoAddTodo.status} variant={showInfoAddTodo.status}>
                        {showInfoAddTodo.message}
                    </Alert>
                )}
            <h2>Lista dei Todo</h2>
            <Row>
                <Col>
                    <TodoForm addTodo={addTodo} info={showInfoAddTodo} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TodoList
                        todos={todos}
                        editingTodo={editingTodo}
                        startEditTodo={startEditTodo}
                        cancelEditTodo={cancelEditTodo}
                        saveModifyTodo={saveModifyTodo}
                        deleteTodo={deleteTodo}
                        newTodo={newTodo}
                        setNewTodo={setNewTodo}
                    />
                </Col>
            </Row>
        </Container>
    );
};
export default TodoApp;
