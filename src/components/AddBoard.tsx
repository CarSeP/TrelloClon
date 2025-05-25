import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

interface Props {
	onOpen: () => void;
}

export function AddBoard({ onOpen }: Props) {
	return (
		<Card className="hover:shadow-md p-0 transition-shadow duration-200 overflow-hidden border-dashed border-2 hover:border-primary/50">
			<Button
				onClick={onOpen}
				variant="ghost"
				className="w-full h-full cursor-pointer min-h-[140px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
			>
				<Plus className="h-8 w-8" />
				<span className="text-lg font-medium">Add board</span>
			</Button>
		</Card>
	);
}
