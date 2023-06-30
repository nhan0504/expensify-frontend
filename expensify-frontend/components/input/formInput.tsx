"use-client";

import { useState } from "react";
import "./style.css";

type InputProps = {
  text: string;
  type: string;
};

export const FormInput: React.FC<InputProps> = ({
  text,
  type,
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
        name={text}
        placeholder={text}
        required
        className="styled-input"
      />
    </div>
  );
};
