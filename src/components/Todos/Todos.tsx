import React from "react";
import { TodosProps } from "../../types";
import SingleTodo from "./SingleTodo";
import "./todos.css";

const TodosList: React.FC<TodosProps> = ({ todos, setTodos }: TodosProps) => {
  const handleDoneEvent = (id: number) => {
    setTodos(
      todos.map((val) =>
        val.id === id ? { ...val, isDone: !val.isDone } : val
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((val) => val.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number, todo: string) => {
    e.preventDefault();
    setTodos(todos.map((val) => (val.id === id ? { ...val, todo } : val)));
  };

  return (
    <div className="todoslistContainer">
      {todos.map((todo) => {
        return (
          <SingleTodo
            key={todo.id}
            data={todo}
            handleDoneEvent={handleDoneEvent}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
};

export default TodosList;
