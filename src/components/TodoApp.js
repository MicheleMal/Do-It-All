import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import "../assets/styles/todoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [uniqueId, setUniqueId] = useState();

  async function fetchTodo() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTodos(res.data);
      setUniqueId(res.data.length + 1);
    } catch (error) {
      console.error(error);
    }
  }

  // viene eseguita immediatamente dopo il rendering del componente
  useEffect(() => {
    fetchTodo();
  }, []);

  // Aggiunge nuovo todo
  function addTodo(input) {
    setUniqueId(uniqueId + 1);
    const newTodo = {
      id: uniqueId,
      title: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  // Controllo se il todo è completato
  function completeTodo(id) {
    setTodos(todos.map((todo)=>{
      if(todo.id===id){
        return{
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }));
  }

  // Modifica todo
  function modifyTodo(id, newTitle) {
    setTodos(todos.map((todo)=>{
      if(todo.id===id){
        return{
          ...todo,
          title:newTitle
        }
      }
      return todo
    }))
  }

  // ELimina todo
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <div className="todoApp">
        <SearchBar addTodo={addTodo} />
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          modifyTodo={modifyTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}
