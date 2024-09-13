import { useState } from "react";
import PlusIcon from "./PlusIcon";
import NewItem from "./NewItem";

function AddItem({ actions }: { actions: any }) {
  
  const [mode, setMode] = useState(false);
  const onClick = () => setMode(true);
  const addItem = (title: string, description: string) => {
    actions.addItem(title, description)
    setMode(false)    
  }

  if (mode) return <NewItem addItem={addItem}/>;

  return (
    <button onClick={onClick} className="w-full hover:bg-gray-200 rounded cursor-pointer">
      <div className="flex justify-between py-1 px-4">
        <h4 className="text-lg font-medium">Add Item</h4>
          <PlusIcon/>
      </div>
    </button>
  );
}

export default AddItem;
