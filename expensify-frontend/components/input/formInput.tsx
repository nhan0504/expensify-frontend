"use-client";

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
    <div className="mb-3">
      <label htmlFor={label} className="text-white text-lg font-bold ml-4">
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
        className="p-3 m-2 indent-2 rounded-3xl"
      />
    </div>
  );
};
