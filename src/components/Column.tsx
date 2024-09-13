import { Task } from "../interfaces/Task";
import DropdownMenu from "./ColumnDropdown";
import { useState } from "react";
import EditColumn from "./EditColumn";
import Item from "./Item";
import AddItem from "./AddItem";

interface ColumnProps {
  item: Task;
  editColumn: (id: number, title: string) => void;
  deleteColumn: (id: number) => void;
  addItem: (id: number, title: string, description: string) => void;
  deleteItem: (idColumn: number, idItem: number) => void;
  editItem: (idColumn: number, idItem: number, title: string, description: string) => void;
}

function Column({ item, editColumn, deleteColumn, addItem, deleteItem, editItem }: ColumnProps) {
  const [editMode, setEditMode] = useState(false);
  const actions = {
    delete: () => {
      deleteColumn(item.id);
    },
    edit: (title: string) => {
      editColumn(item.id, title), setEditMode(false);
    },
    addItem: (title: string, description: string) => {
      addItem(item.id, title, description)
    },
    deleteItem: (id: number) => {
      deleteItem(item.id, id)
    },
    editItem: (id: number, title: string, description: string) => {
      editItem(item.id, id, title, description)
    },
    setMode: (value: boolean) => {
      setEditMode(value);
    },
  };

  if (editMode) return <EditColumn title={item.title} actions={actions} />;

  return (
    <div className="w-96 inline-block rounded-md shadow border">
      <header className="flex justify-between px-4 py-3 border-b">
        <h3 className="text-lg font-medium">{item.title}</h3>
        <DropdownMenu actions={actions} />
      </header>
      <div className="p-4 space-y-4">
        {
          item.items.map(el => <Item key={el.id} item={el} actions={actions} />)
        }
        <AddItem actions={actions} />
      </div>
    </div>
  );
}

export default Column;
