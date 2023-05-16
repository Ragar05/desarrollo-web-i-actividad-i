import { useState } from "react";
import { formContext } from "../Context/FormContext";

type FormProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formValue, setFormValue] = useState<{
    [name: string]: string | number;
  }>({});

  const formOnChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target }) => {
    setFormValue((value) => ({
      ...value,
      ...(target.type === "number" && { [target.name]: Number(target.value) }),
      ...((target.type !== "number" || !target.type) && {
        [target.name]: target.value,
      }),
    }));
  };

  const resetForm = () => setFormValue({});

  const setDataOnForm = (data: { [name: string]: string | number }) => {
    setFormValue({ ...data });
  };

  return (
    <formContext.Provider
      value={{
        formValue,
        formOnChange,
        resetForm,
        setDataOnForm,
      }}
    >
      {children}
    </formContext.Provider>
  );
};
