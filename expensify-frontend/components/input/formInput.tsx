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
  return (
    <div className="styled-container">
      <label htmlFor={text} className="styled-label">
        {text}
      </label>
      <br />
      <input
        id={text}
        type={type}
        value={input}
        placeholder={text}
        onChange={onInput}
        required
        className="styled-input"
      />
    </div>
  );
};
