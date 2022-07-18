import React, { useRef, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TodosList from "./components/Todos/Todos";
import { Todos } from "./types";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();

    if (todo && todo !== "") {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">taskify</span>
      <InputField
        ref={inputRef}
        todo={todo}
        setTodo={setTodo}
        handleAddTodo={handleAddTodo}
      />
      <TodosList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
