type ListItemProperties = {
  data: { [name: string]: string | number };
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (id: string) => Promise<void> | void;
};

export const ListItem = ({ data, onDelete, onEdit }: ListItemProperties) => {
  return (
    <li className="list-group-item p-3">
      <div className="row">
        <div className="col-9">
            <strong>Nombre Completo:</strong> {data.full_name}
            <br />
            <strong>Correo:</strong> {data.email}
            <br />
            <strong>Numero de telefono:</strong> {data.cellphone}
            <br />
            <strong>Direccion:</strong> {data.address}
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            onClick={() => onEdit(data!.id as string)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(data!.id as string)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};
