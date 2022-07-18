import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { TodosProps } from "../../types";
import SingleTodo from "./SingleTodo";
import "./todos.css";

const TodosList: React.FC<TodosProps> = ({
  todos,
  setTodos,
  completedTodos,
  setcompletedtodos,
}: TodosProps) => {


  const handleDoneEvent = (id: number, type: string) => {
    let handleDoneData;
    if (type === "active") {
      let activeTodos = [...todos];
      handleDoneData = activeTodos.filter((val) => val.id === id)[0];
      setcompletedtodos([
        ...completedTodos,
        { ...handleDoneData, isDone: true },
      ]);
      setTodos(activeTodos.filter((val) => val.id !== id));
    } else {
      let completedTodoData = [...completedTodos];
      handleDoneData = completedTodoData.filter((val) => val.id === id)[0];
      setTodos([...todos, { ...handleDoneData, isDone: false }]);
      setcompletedtodos(completedTodoData.filter((val) => val.id !== id));
    }
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
      <Droppable droppableId={"ActivetodoList"}>
        {(provided, snapshots) => (
          <div
            className={`todo_pending ${
              snapshots.isDraggingOver ? "drapActive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo_heading">Active Tasks</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  type={"active"}
                  data={todo}
                  handleDoneEvent={handleDoneEvent}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={"CompletedTodoLists"}>
        {(provided, snapshots) => (
          <div
            className={`todo_completed ${
              snapshots.isDraggingOver ? "dragComplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todo_heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  data={todo}
                  type={"complete"}
                  handleDoneEvent={handleDoneEvent}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodosList;
