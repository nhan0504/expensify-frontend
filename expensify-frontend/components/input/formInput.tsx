"use-client";

import { useState } from "react";
import "./style.css";

type InputProps = {
  text: string;
  type: string;
  input: string;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: React.FC<InputProps> = ({
  text,
  type,
  input,
  onInput,
}) => {
  // const [input, setInput] = useState("");

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInput(event.target.value);
  // };

  return (
    <div className="styled-container">
      <p className="styled-label">{text}</p>
      <input
        className="styled-input"
        type={type}
        value={input}
        placeholder={text}
        onChange={onInput}
        required
      />
    </div>
  );
};
