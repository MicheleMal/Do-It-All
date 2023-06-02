import Todo from "./Todo";

export default function TodoList({ todos, completeTodo, modifyTodo, deleteTodo }) {
  return (
    <>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            modifyTodo={modifyTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </>
  );
}
