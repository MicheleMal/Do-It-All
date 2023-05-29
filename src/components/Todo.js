export default function Todo({todo, completeTodo}) {
  return (
    <>
      <div>
        <input type="checkbox" onChange={()=>{completeTodo(todo.id)}} checked={todo.isCompleted} />

        <label style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
          {todo.todo}
        </label>

        <button className="button">Modifica</button>
        <button className="button">Elimina</button>
      </div>
    </>
  );
}
