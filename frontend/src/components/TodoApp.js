import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import "../assets/styles/todoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [uniqueId, setUniqueId] = useState(0);

  // Funzione che prende tutti i todo presenti nel db tramite API
  async function fetchTodo() {
    try {
      // const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      // setTodos(res.data)

      const res = await axios.get("http://localhost:5000/todo/get");
      setTodos(res.data.data);
      setUniqueId(res.data.data.length + 1);
    } catch (error) {
      console.error(error);
    }
  }

  // viene eseguita immediatamente dopo il rendering del componente
  useEffect(() => {
    fetchTodo();
  }, []);

  // Aggiunge nuovo todo tramite API
  async function addTodo(input) {
    // setUniqueId(uniqueId + 1);
    // const newTodo = {
    //   id: uniqueId,
    //   title: input,
    //   completed: false,
    // };

    // setTodos([...todos, newTodo]);
    try {
      const res = await axios.post("http://localhost:5000/todo/add", {
        id: uniqueId,
        title: input,
      });

      if (res.data.check === true) {
        const newTodo = {
          id: uniqueId,
          title: input,
          completed: false,
        };
        setTodos([...todos, newTodo]);
        setUniqueId(uniqueId + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Controllo se il todo è completato
  async function completeTodo(id) {
    try {
      const res = await axios.patch(
        `http://localhost:5000/todo/completed/${id}`
      );

      if (res.data.check === true) {
        setTodos(
          todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            }
            return todo;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Modifica todo
  async function modifyTodo(id, newTitle) {
    try {
      const res = await axios.patch(`http://localhost:5000/todo/modify/${id}`, {
        title: newTitle,
      });

      if (res.data.check === true) {
        setTodos(
          todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                title: newTitle,
              };
            }
            return todo;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // ELimina todo
  async function deleteTodo(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/todo/delete/${id}`);

      if (res.data.check === true) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
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
