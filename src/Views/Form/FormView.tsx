import { memo, useCallback, useEffect, useState } from "react";
import { Input } from "../../components/Form/components/Input";
import { useFormContext } from "../../components/Form/hook/useFormContext";
import { Form } from "../../components/Form/components/Form";
import { v4 as uuidV4 } from "uuid";
import { List } from "../../components/List/List";

type UserModel = {
  id: string;
  full_name: string;
  email: string;
  cellphone: number;
  address: string;
};

export const FormView = memo(() => {
  const [id, setId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);

  const { resetForm, setDataOnForm } = useFormContext();

  const handleEdit = useCallback((id: string) => setId(id), []);

  const handleDelete = useCallback((id: string) => {
    const filterUsers = users.filter((x) => x.id !== id);
    setUsers(filterUsers);
    setId(null);
    resetForm();
  }, []);

  const handleSubmit = (formValue: Omit<UserModel, "id">) => {
    try {
      const isEditable = Boolean(id);

      if (!formValue.full_name || formValue.full_name === "") {
        throw new Error(
          "El nombre completo del usuario debe ser una cadena de texto"
        );
      }

      if (!formValue.email || formValue.email === "") {
        throw new Error("El email debe ser valido");
      }

      if (!formValue.cellphone || Number.isNaN(Number(formValue.cellphone))) {
        throw new Error("El numero de telefono debe ser de caracter numerico");
      }

      if (!formValue.address || formValue.address === "") {
        throw new Error(
          "La direccion del usuario debe ser una cadena de texto"
        );
      }

      const data: UserModel = {
        ...formValue,
        id: "",
      };

      if (!isEditable) {
        data.id = uuidV4();
        setUsers([...users, data]);
      } else {
        data.id = id as string;
        const newUsersList = users.map((user) =>
          user.id === id ? data : user
        );
        setUsers(newUsersList);
        setId(null);
      }

      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (id) {
      const dataFinded = users.find((user) => user.id === id);

      if (!dataFinded) setId(null);

      setDataOnForm(
        dataFinded as unknown as { [name: string]: string | number }
      );
    }
  }, [id]);

  return (
    <div className="container mt-2">
      <div style={{ margin: "0 auto", width: 800 }}>
        <Form
          onSubmit={(dataForm) =>
            handleSubmit(dataForm as unknown as Omit<UserModel, "id">)
          }
        >
          <div className="row mb-3">
            <Input
              name="full_name"
              type="text"
              label="Nombre Completo"
              defaultValue={""}
              className={"col-6"}
            />
            <Input
              name="email"
              type="email"
              label="Correo electronico"
              defaultValue={""}
              required={true}
              className={"col-6"}
            />
            <Input
              name="cellphone"
              type="number"
              label="Numero de telefono"
              defaultValue={0}
              className={"col-6"}
            />
            <Input
              name="address"
              type="text"
              label="Direccion"
              defaultValue={""}
              required={true}
              className={"col-6"}
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary col-2 align-self-center"
            >
              {id && id !== "" ? "Editar" : "Guardar"}
            </button>
          </div>
        </Form>

        <List data={users} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
});
