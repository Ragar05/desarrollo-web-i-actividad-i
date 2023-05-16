import { ListItem } from "./ListItem";
type ListProperties = {
  data: Array<{ [name: string]: string | number }>;
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (id: string) => Promise<void> | void;
};

export const List = ({ data, onDelete, onEdit }: ListProperties) => {
  return (
    <div className="card mt-3">
      <ul className="list-group list-group-flush">
        {data.length > 0 &&
          data.map((data, index) => (
            <ListItem
              data={data}
              key={index}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
      </ul>
    </div>
  );
};
