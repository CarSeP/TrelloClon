import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { env } from "@/config";
import { useEffect, useState } from "react";
import { BoardType } from "@/interfaces/board.model";
import { useNavigate } from "react-router-dom";
import { AddBoardDialog } from "@/components/AddBoardDialog";

export function BoardsGrid() {
	const navigate = useNavigate();

	const [boards, setBoards] = useState<BoardType[]>([]);
	const [open, setOpen] = useState(false);

	const fetchData = async () => {
		const response = await fetch(env.backendURL + "/api/board");
		const data = await response.json();
		setBoards(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container mx-auto p-6">
			<div className="mb-8 text-center">
				<h1 className="text-3xl font-bold tracking-tight mb-2">My Projects</h1>
				<p className="text-muted-foreground">
					Manage and organize all your projects
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{boards.map((board) => (
					<Card
						onClick={() => {
							navigate(board.id);
						}}
						key={board.id}
						className="hover:shadow-md transition-shadow duration-200 cursor-pointer min-h-[140px] flex items-center justify-center"
					>
						<CardTitle className="text-lg text-center">{board.title}</CardTitle>
					</Card>
				))}

				<Card className="hover:shadow-md p-0 transition-shadow duration-200 overflow-hidden border-dashed border-2 hover:border-primary/50">
					<Button
						onClick={() => {
							setOpen(true);
						}}
						variant="ghost"
						className="w-full h-full cursor-pointer min-h-[140px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
					>
						<Plus className="h-8 w-8" />
						<span className="text-lg font-medium">Add board</span>
					</Button>
				</Card>
				<AddBoardDialog
					open={open}
					onClose={() => setOpen(false)}
					reload={fetchData}
				/>
			</div>
		</div>
	);
}
