export const TodoApp = () => {
    return (
        <h2>Lista dei Todo</h2>
        // {todos.map((todo) => (
        //     <Card key={todo.id} className="mt-4">
        //         <Card.Body>
        //             <Form.Group>
        //                 <Form.Control
        //                     type="text"
        //                     value={todo.text}
        //                     onChange={(e) =>
        //                         handleEditTodo(
        //                             todo.id,
        //                             e.target.value
        //                         )
        //                     }
        //                 />
        //             </Form.Group>
        //             <Form.Check
        //                 type="checkbox"
        //                 label="Completato"
        //                 checked={todo.completed}
        //                 onChange={() => handleCompleteTodo(todo.id)}
        //             />
        //             <Button
        //                 variant="danger"
        //                 onClick={() => handleDeleteTodo(todo.id)}
        //             >
        //                 Elimina
        //             </Button>
        //         </Card.Body>
        //     </Card>
        // ))}
    );
};
export default TodoApp;
