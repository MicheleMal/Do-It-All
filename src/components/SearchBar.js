import { useState } from "react";

export default function SearchBar({ addTodo }) {
  const [input, setInput] = useState("");

  function onHandleAddTodo() {
    if (input!=="") {
      addTodo(input.trim());
      setInput("");
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Inserisci todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button" onClick={onHandleAddTodo}>Aggiungi</button>
    </div>
  );
}
