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

interface Props {
	title: string;
	id: string;
	onNavigate: (id: string) => void;
	reload: () => void;
}

export function BoardCell({ title, id, onNavigate, reload }: Props) {
	const [open, setOpen] = useState(false);

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
								setOpen(true);
							}}
						>
							Delete
						</DropdownMenuItem>
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={(e) => e.stopPropagation()}
						>
							Edit
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Card>
			<DeleteBoardDialog
				open={open}
				onClose={() => setOpen(false)}
				id={id}
				reload={reload}
			/>
		</>
	);
}
