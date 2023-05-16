import { HTMLInputTypeAttribute, memo, useState } from "react";
import { useFormContext } from "../hook/useFormContext";
import { v4 as uuidV4 } from "uuid";

type InputProperties = {
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  defaultValue?: string | number,
  required?: boolean,
  className?: string
};

export const Input = memo(({ name, label, type, defaultValue, required =  false, className = ""}: InputProperties) => {
  const [inputId] = useState<string>(uuidV4());

  const { formOnChange, formValue } = useFormContext();
  
  return (
    <div className={className}>
      {label && label !== "" && <label htmlFor={inputId} className="form-label">{label}</label>}
      <input
        id={inputId}
        name={name}
        type={type}
        value={formValue[name] || defaultValue}
        required={required}
        onChange={(e) => formOnChange(e)}
        className="form-control"
      />
    </div>
  );
});
