import { useFormContext } from "../hook/useFormContext";

type FormProperties = {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (formValue: { [name: string]: string | number}) => Promise<void> | void;
};

export const Form = ({ children, onSubmit }: FormProperties) => {
  const { formValue } = useFormContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formValue);
      }}
    >
      {children}
    </form>
  );
};
