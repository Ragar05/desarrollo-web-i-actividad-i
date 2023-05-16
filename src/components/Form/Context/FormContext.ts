import { createContext } from "react";

type FormContext = {
  formValue: { [name: string]: string | number };
  formOnChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  resetForm: () => void;
  setDataOnForm: (data: { [name: string]: string | number }) => void;
};

export const formContext = createContext<FormContext>({
  formOnChange: () => {},
  formValue: {},
  resetForm: () => {},
  setDataOnForm: () => {}
});
