import { useState } from "react";

export default function SearchBar({ addTodo }) {
  const [input, setInput] = useState("");

  function onHandleSubmit() {
    if (input !== "") {
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
      <button onClick={onHandleSubmit}>Aggiungi</button>
    </div>
  );
}
