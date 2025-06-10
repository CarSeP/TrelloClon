import { useError } from "@/customhooks/useError";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { env } from "@/config";
import { BoardContext } from "@/pages/BoardView";
import { useContext } from "react";

interface Props {
	open: boolean;
	onClose: () => void;
	id: string;
	columnID: number;
}

export function EditColumnDialog({ open, onClose, id, columnID }: Props) {
	const { setError } = useError();
	const useBoard = useContext(BoardContext);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		e.target.title.focus();
		const title = e.target.title.value.trim();

		if (!title) return;

		try {
			const response = await fetch(
				env.backendURL + `/api/column/${id}/${columnID}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title }),
				}
			);

			if (!response.ok) throw new Error("Status: " + response.status);

			useBoard();
			onClose();
		} catch {
			setError(true);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Edit Column</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Column Title</Label>
							<Input
								id="title"
								name="title"
								placeholder="Enter column title"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Edit Column</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
