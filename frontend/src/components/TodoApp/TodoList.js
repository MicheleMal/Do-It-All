import { Card, ListGroup } from "react-bootstrap";
import Todo from "./Todo";

const TodoList = ({
    todos,
    editingTodo,
    startEditTodo,
    cancelEditTodo,
    saveModifyTodo,
    deleteTodo,
    newTodo,
    setNewTodo,
}) => {
    return (
        <Card>
            <Card.Body>
                <h2>Lista dei Todo</h2>
                <ListGroup>
                    {todos.map((todo) => (
                        <ListGroup.Item key={todo._id}>
                            <Todo
                                todo={todo}
                                editing={editingTodo === todo._id}
                                startEditTodo={startEditTodo}
                                cancelEditTodo={cancelEditTodo}
                                saveModifyTodo={saveModifyTodo}
                                deleteTodo={deleteTodo}
                                newTodo={newTodo}
                                setNewTodo={setNewTodo}
                                //   cancelEditTodo={cancelEditTodo}
                                //   handleDeleteTodo={handleDeleteTodo}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
export default TodoList;
