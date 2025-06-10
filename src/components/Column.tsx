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
import { DeleteColumnDialog } from "./DeleteColumnDialog";
import { useParams } from "react-router-dom";
import { EditColumnDialog } from "./EditColumnDialog";

interface Props {
	column: ColumnType;
	index: string;
}

enum Dialog {
	deleteBoard,
	editBoard,
	addCard,
}

export function Column({ column, index }: Props) {
	const [openDialog, setOpenDialog] = useState<Dialog | null>(null);
	const cardRef = useRef(null);
	const { moveCard } = useBoardStore((state) => state);
	const { id } = useParams();

	const closeDialog = () => {
		setOpenDialog(null);
	};

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
						onClick={() => setOpenDialog(Dialog.addCard)}
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
							<DropdownMenuItem
								onClick={() => {
									setOpenDialog(Dialog.editBoard);
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setOpenDialog(Dialog.deleteBoard);
								}}
							>
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
					onClick={() => setOpenDialog(Dialog.addCard)}
				>
					<Plus className="mr-1 h-4 w-4" />
					Add a card
				</Button>
			</div>
			<AddCardDialog
				columnId={column.id}
				open={openDialog === Dialog.addCard}
				onClose={closeDialog}
			/>
			<DeleteColumnDialog
				open={openDialog === Dialog.deleteBoard}
				onClose={closeDialog}
				id={id || ""}
				columnID={column.id}
			/>
			<EditColumnDialog
				open={openDialog === Dialog.editBoard}
				onClose={closeDialog}
				id={id || ""}
				columnID={column.id}
			/>
		</div>
	);
}
