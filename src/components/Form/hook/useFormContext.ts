import { useContext } from "react";
import { formContext } from "../Context/FormContext";

export const useFormContext = () => useContext(formContext);
