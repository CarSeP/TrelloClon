import { useState } from "react";
import PlusIcon from "./PlusIcon";
import NewColumn from "./NewColumn";

function AddColumn({ addColumn }: { addColumn: (title: string) => void }) {
  const [mode, setMode] = useState(false)
  
  const onClick = () => setMode(true)
  const createColunm = (title: string) => {
    if(title.trim()) addColumn(title)
    setMode(false)
  }

  if (mode) return <NewColumn createColunm={createColunm}/>

  return (
    <button onClick={onClick} className="hover:bg-gray-200 w-96 inline-block rounded-md shadow border">
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="text-lg font-medium">Add new column</h3>
          <PlusIcon className="py-[0.3rem] box-content w-5 h-5" />
      </header>
    </button>
  );
}

export default AddColumn;
