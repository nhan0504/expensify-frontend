"use-client";

import { useState } from "react";
import "./style.css";

type InputProps = {
  text: string;
  type: string;
};

export const FormInput: React.FC<InputProps> = ({ text, type }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="styled-container">
      <p className="styled-label">{text}</p>
      <input
        className="styled-input"
        type={type}
        value={input}
        placeholder={text}
        onChange={handleInputChange}
      />
    </div>
  );
};
