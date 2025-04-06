import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnType } from "@/interfaces/board.model";
import { AddCardDialog } from "./AddCardDialog";
import { useEffect, useRef, useState } from "react";
import { cardsConfig } from "@/lib/sortableConfig";
import Sortable from "sortablejs";
import { useBoardStore } from "@/store/boardStore";

interface Props {
  column: ColumnType;
  index: string;
}

export function Column({ column, index }: Props) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  const { moveCard } = useBoardStore((state) => state);

  useEffect(() => {
    if (!cardRef.current) return;
    new Sortable(cardRef.current, cardsConfig(moveCard));
  });

  return (
    <div className="flex h-full w-72 shrink-0 flex-col rounded-lg border bg-muted/20">
      <div className="flex items-center justify-between p-3">
        <h3 className="font-medium">{column.title}</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add card</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-2 min-h-5" ref={cardRef} id={index}>
          {column.cards.map((card) => (
            <TaskCard key={card.id} card={card} />
          ))}
        </div>
      </div>
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add a card
        </Button>
      </div>
      <AddCardDialog
        columnId={column.id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
