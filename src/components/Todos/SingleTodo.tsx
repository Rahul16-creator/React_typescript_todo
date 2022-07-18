import React, { useEffect, useRef, useState } from "react";
import { Todos } from "../../types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type SingleTodoProp = {
  data: Todos;
  handleDoneEvent: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (e: React.FormEvent, id: number, todo: string) => void;
};

const SingleTodo: React.FC<SingleTodoProp> = ({
  data,
  handleDoneEvent,
  handleDelete,
  handleEdit,
}: SingleTodoProp) => {
    
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(data.todo);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <div className="singleTodoContainer">
      {edit ? (
        <form
          onSubmit={(e) => {
            handleEdit(e, data.id, editTodo);
            setEdit(false);
          }}
        >
          <input
            ref={inputRef}
            className="singleContainer__text"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        </form>
      ) : data.isDone ? (
        <s className="singleContainer__text"> {data.todo} </s>
      ) : (
        <span className="singleContainer__text">{data.todo}</span>
      )}
      <div className="icons">
        <span onClick={() => handleDoneEvent(data.id)}>
          <MdDone />
        </span>
        <span
          onClick={() => {
            setEdit((pre) => !pre);
            setEditTodo((pre) => editTodo);
          }}
        >
          <AiFillEdit />
        </span>
        <span onClick={() => handleDelete(data.id)}>
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};

export default SingleTodo;
