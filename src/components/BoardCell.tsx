import { MoreVertical } from "lucide-react";
import { Card, CardTitle } from "./ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteBoardDialog } from "./DeleteBoardDialog";
import { useState } from "react";
import { EditBoardDialog } from "./EditBoardDialog";

interface Props {
	title: string;
	id: string;
	onNavigate: (id: string) => void;
	reload: () => void;
}

enum Dialog {
	deleteBoard,
	editBoard,
}

export function BoardCell({ title, id, onNavigate, reload }: Props) {
	const [openDialog, setOpenDialog] = useState<Dialog | null>(null);

	return (
		<>
			<Card
				onClick={() => {
					onNavigate(id);
				}}
				className="hover:shadow-md transition-shadow duration-200 cursor-pointer min-h-[140px] flex items-center justify-center relative"
			>
				<CardTitle className="text-lg text-center">{title}</CardTitle>
				<DropdownMenu>
					<DropdownMenuTrigger className="absolute cursor-pointer top-2 right-2 p-2 rounded hover:bg-gray-100">
						<MoreVertical className="h-4 w-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								setOpenDialog(Dialog.deleteBoard);
							}}
						>
							Delete
						</DropdownMenuItem>
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								setOpenDialog(Dialog.editBoard);
							}}
						>
							Edit
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Card>
			<DeleteBoardDialog
				open={openDialog === Dialog.deleteBoard}
				onClose={() => setOpenDialog(null)}
				id={id}
				reload={reload}
			/>
			<EditBoardDialog
				open={openDialog === Dialog.editBoard}
				onClose={() => setOpenDialog(null)}
				id={id}
				reload={reload}
			/>
		</>
	);
}
