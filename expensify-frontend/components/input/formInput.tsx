"use-client";

import "./style.css";

type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput: React.FC<InputProps> = ({
  label,
  type,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className="styled-container">
      <label htmlFor={label} className="styled-label">
        {label}
      </label>
      <br />
      <input
        id={label}
        type={type}
        name={name}
        placeholder={placeholder || label}
        onChange={onChange}
        required
        className="styled-input"
      />
    </div>
  );
};
