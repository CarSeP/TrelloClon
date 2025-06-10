import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "@/config";
import { useError } from "@/customhooks/useError";
import { BoardContext } from "@/pages/BoardView";
import { useContext } from "react";
import { useParams } from "react-router-dom";

interface Props {
	open: boolean;
	onClose: () => void;
}

export function AddColumnDialog({ open, onClose }: Props) {
	const { id } = useParams();
	const { setError } = useError();

	const useBoard = useContext(BoardContext);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		e.target.title.focus();
		const title = e.target.title.value.trim();

		if (!title) return;

		try {
			const response = await fetch(env.backendURL + "/api/column/" + id, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title }),
			});

			if (!response.ok) throw new Error("Status: " + response.status);
		} catch {
			setError(true);
		}

		useBoard();
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add New Column</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Column Title</Label>
							<Input
								id="title"
								name="title "
								placeholder="Enter column title"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Add Column</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
