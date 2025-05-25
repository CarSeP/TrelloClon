import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useError } from "@/customhooks/useError";

export function ErrorDialog() {
	const { error, setError } = useError();

	return (
		<Dialog
			open={error}
			onOpenChange={() => {
				setError(false);
			}}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
							<AlertTriangle className="h-5 w-5 text-red-600" />
						</div>
						<div className="flex-1">
							<DialogTitle className="text-left text-red-900">
								Server Error
							</DialogTitle>
						</div>
					</div>
					<DialogDescription className="text-left text-gray-600 mt-2">
						A server error has occurred, try again, if the error persists try
						again later.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
					<Button
						variant="outline"
						onClick={() => {
							setError(false);
						}}
					>
						Close
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
