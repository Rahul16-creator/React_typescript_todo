import React, { useEffect, useRef, useState } from "react";
import { Todos } from "../../types";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type SingleTodoProp = {
  index: number;
  data: Todos;
  type: string;
  handleDoneEvent: (id: number, type: string) => void;
  handleDelete: (id: number) => void;
  handleEdit: (e: React.FormEvent, id: number, todo: string) => void;
};

const SingleTodo: React.FC<SingleTodoProp> = ({
  index,
  data,
  type,
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
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <div
          className="singleTodoContainer"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
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
            <span onClick={() => handleDoneEvent(data.id, type)}>
              {type === "active" ? <MdDone /> : <AiOutlineClose />}
            </span>
            <span
              onClick={() => {
                setEdit((pre) => !pre);
                setEditTodo(editTodo);
              }}
              className={`${type === "complete" ? "span_disabled" : ""}`}
            >
              <AiFillEdit />
            </span>
            <span
              className={`${type === "complete" ? "span_disabled" : ""}`}
              onClick={() => handleDelete(data.id)}
            >
              <AiFillDelete />
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
