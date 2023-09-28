import { Card, ListGroup } from "react-bootstrap";
import Todo from "./Todo";

const TodoList = ({
    todos,
    editingTodo,
    startEditTodo,
    cancelEditTodo,
    onSaveModifyTodo,
    onDeleteTodo,
    onCompleteTodo,
    newTodo,
    setNewTodo,
}) => {
    return (
        <Card>
            <Card.Body>
                <h2>Lista dei Todo</h2>
                <ListGroup>
                    {todos.map((todo) => (
                        <ListGroup.Item key={todo._id} className="mb-3 shadow" style={{border: "1px solid #ccc", borderRadius: "10px"}}>
                            <Todo
                                todo={todo}
                                editing={editingTodo === todo._id}
                                startEditTodo={startEditTodo}
                                cancelEditTodo={cancelEditTodo}
                                onSaveModifyTodo={onSaveModifyTodo}
                                onDeleteTodo={onDeleteTodo}
                                onCompleteTodo={onCompleteTodo}
                                newTodo={newTodo}
                                setNewTodo={setNewTodo}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
export default TodoList;
