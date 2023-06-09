import { useState } from "react";

export default function Todo({ todo, completeTodo, modifyTodo, deleteTodo }) {
  const [isModify, setIsModify] = useState(false);
  const [modify, setModify] = useState("")

  function onHandleModify(){
    modifyTodo(todo.id, modify)
    setIsModify(false)
  }

  function modifyButton(){
    setModify(todo.title)
    setIsModify(true)
  }

  function castStringBoolean(str){
    if(str===true || str==="true"){
      return true
    }else{
      return false
    }
  }

  return (
    <>
      <div>
        <input
          type="checkbox"
          onChange={() => {
            completeTodo(todo.id);
          }}
          // checked={todo.completed}
          checked = {castStringBoolean(todo.completed)}
        />

        {!isModify ? (
          <label style={{ textDecoration: castStringBoolean(todo.completed) ? "line-through" : "none" }}>
            {todo.title}
          </label>
        ) : (
          <input type="text" value={modify} onChange={(e)=>{setModify(e.target.value)}} />
        )}

        {
          !isModify ? (
            <button className="button" onClick={modifyButton}>Modifica</button>
          ):(
            <button className="button" onClick={onHandleModify}>Salva</button>
          )
        }
        

        <button
          className="button"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          Elimina
        </button>
      </div>
    </>
  );
}
