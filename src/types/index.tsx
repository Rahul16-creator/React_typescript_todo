import React from "react";

export interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface Todos {
  id: number;
  todo: string;
  isDone: boolean;
}


export interface TodosProps {
    todos:Todos[],
    setTodos:React.Dispatch<React.SetStateAction<Todos[]>>
}