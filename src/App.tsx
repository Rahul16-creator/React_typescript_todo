import React, { useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TodosList from "./components/Todos/Todos";
import { Todos } from "./types";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const [completedTodos, setcompletedtodos] = useState<Todos[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();

    if (todo && todo !== "") {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const draggableResult = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add;
    let active = [...todos],
      completed = [...completedTodos];

    if (source.droppableId === "ActivetodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "CompletedTodoLists") {
      completed.splice(destination.index, 0, {...add,isDone:true});
    } else {
      active.splice(destination.index, 0, {...add,isDone:false});
    }
    setTodos(active);
    setcompletedtodos(completed);
  };

  return (
    <DragDropContext onDragEnd={draggableResult}>
      <div className="App">
        <span className="heading">taskify</span>
        <InputField
          ref={inputRef}
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
        <TodosList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setcompletedtodos={setcompletedtodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
