import React from "react";
import Button from "../Button/Button";
import "./inputField.css";
import { InputFieldProps } from "../../types/index";

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props: InputFieldProps, ref) => {

    const { todo, setTodo, handleAddTodo } = props;
    return (
      <form className="input" onSubmit={handleAddTodo}>
        <input
          ref={ref}
          value={todo}
          type="text"
          className="input__box"
          placeholder="Enter the text"
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button styleClassName={"input__submit"} label={"Go"} />
      </form>
    );
  }
);

export default InputField;
