import { Trello } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
	const navigate = useNavigate();
	return (
		<header className="sticky top-0 z-10 border-b bg-background">
			<div className="flex h-14 items-center px-4 md:px-6">
				<div
					onClick={() => {
						navigate("/board");
					}}
					className="mr-4 flex items-center gap-2 font-semibold hover:text-blue-600 cursor-pointer"
				>
					<div className="rounded p-1">
						<Trello size={24} />
					</div>
					<span>Trello clon</span>
				</div>
				<div className="ml-auto flex items-center gap-2">
					<span className="text-sm text-muted-foreground">
						Project Workspace
					</span>
				</div>
			</div>
		</header>
	);
}
