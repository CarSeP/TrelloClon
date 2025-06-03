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

interface Props {
	open: boolean;
	onClose: () => void;
	reload: () => void;
	id: string;
}

export function EditBoardDialog({ open, onClose, reload, id }: Props) {
	const { setError } = useError();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		e.target.title.focus();
		const title = e.target.title.value.trim();

		if (!title) return;

		try {
			const response = await fetch(env.backendURL + "/api/board/" + id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title }),
			});

			if (!response.ok) throw new Error("Status: " + response.status);

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
						<DialogTitle>Edit Board</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Board Title</Label>
							<Input
								id="title"
								name="title"
								placeholder="Enter board title"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Edit Board</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
