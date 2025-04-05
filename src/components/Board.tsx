import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Column } from "@/components/Column";
import { ColumnType } from "@/interfaces/board.model";
import { AddColumnDialog } from "./AddColumnDialog";
import { useState } from "react";

interface Props {
  columns: ColumnType[];
  title: string;
}

export function Board({ columns, title }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Add Column
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((el) => (
          <Column key={el.id} column={el} />
        ))}
        <AddColumnDialog open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
