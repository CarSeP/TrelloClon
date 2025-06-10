import { useError } from "@/customhooks/useError";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { env } from "@/config";
import { useContext } from "react";
import { BoardContext } from "@/pages/BoardView";

interface Props {
	open: boolean;
	onClose: () => void;
	id: string;
	columnID: number;
}

export function DeleteColumnDialog({ open, onClose, id, columnID }: Props) {
	const { setError } = useError();
	const useBoard = useContext(BoardContext);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await fetch(
			env.backendURL + `/api/column/${id}/${columnID}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) throw new Error("Status: " + response.status);

		useBoard();
		onClose();
		try {
		} catch {
			setError(true);
		}
	};
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Delete Column</DialogTitle>
					</DialogHeader>
					<div className="mb-4">Do you really want to delete this column?</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Delete</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
