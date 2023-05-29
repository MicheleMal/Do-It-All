//TODO: Inserire evento modifica e elimina

import {useState } from "react";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import "../assets/styles/todoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Aggiunge nuovo todo
  function addTodo(input) {
    const newTodo = {
      id: Math.floor(Math.random() * 300),
      todo: input,
      isCompleted: false
    };

    setTodos([...todos, newTodo]);
  }

  // Controllo se il todo è completato
  function completeTodo(id){
    const updateTodo = todos.map((todo)=>{
      if(todo.id===id){
        return{
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })

    setTodos(updateTodo)
  }

  return (
    <>
      <div className="todoApp">
        <SearchBar addTodo={addTodo} />
        <TodoList todos={todos} completeTodo={completeTodo} />
      </div>
    </>
  );
}
