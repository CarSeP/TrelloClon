import { useEffect, useRef, useState } from "react";
import { TypeItem } from "../interfaces/Task";
import CalendarDaysIcon from "./CalendarDaysIcon";
import EditIcon from "./EditIcon";
import TrashIcon from "./TrashIcon";
import MenuIcon from "./MenuIcon";
import XIcon from "./XIcon";
import EditItem from "./EditItem";

function Item({ item, actions }: { item: TypeItem, actions: any }) {
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const deleteItem = () => {
    setShowMenu(false);
    actions.deleteItem(item.id);
  };

  const editItem = (title: string, description: string) => {
    setShowMenu(false);
    setEditMode(false);
    actions.editItem(item.id, title, description);
  };

  if (editMode) {
    return <EditItem item={item} editItem={editItem} />;
  }

  return (
    <article>
      <div className="p-4 space-y-2">
        <header className="w-full flex justify-between">
          <h4 className="text-lg font-medium">{item.title}</h4>
          {showMenu && (
            <div className="flex gap-2" ref={menuRef}>
              <button onClick={deleteItem}>
                <TrashIcon className="w-5 h-5" />
              </button>
              <button onClick={() => setEditMode(true)}>
                <EditIcon className="w-5 h-5" />
              </button>
              <button onClick={() => setShowMenu(false)}>
                <XIcon className="w-6 h-6" />
              </button>
            </div>
          )}
          {!showMenu && (
            <button onClick={() => setShowMenu(true)}>
              <MenuIcon className="w-5 h-5" />
            </button>
          )}
        </header>
        <p className="text-sm">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4 " />
            <span className="text-xs">{item.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Item;
