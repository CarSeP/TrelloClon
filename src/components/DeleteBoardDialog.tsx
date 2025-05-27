import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/config";
import { useError } from "@/customhooks/useError";

interface Props {
	open: boolean;
	onClose: () => void;
	reload: () => void;
	id: string;
}

export function DeleteBoardDialog({ open, onClose, reload, id }: Props) {
	const { setError } = useError();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			await fetch(env.backendURL + "/api/board/" + id, {
				method: "DELETE",
			});

			reload();
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
						<DialogTitle>Delete Board</DialogTitle>
					</DialogHeader>
					<div className="mb-4">Do you really want to delete this board?</div>
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
