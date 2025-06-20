import { env } from "@/config";
import { useEffect, useState } from "react";
import { BoardType } from "@/interfaces/board.model";
import { useNavigate } from "react-router-dom";
import { AddBoardDialog } from "@/components/AddBoardDialog";
import { useError } from "@/customhooks/useError";
import { AddBoard } from "@/components/AddBoard";
import { BoardCell } from "@/components/BoardCell";
import { Loader } from "@/components/Loader";

export function BoardsGrid() {
	const navigate = useNavigate();
	const { setError } = useError();
	const [boards, setBoards] = useState<BoardType[]>([]);
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const onNavigate = (id: string) => {
		navigate(id);
	};

	const fetchData = async () => {
		try {
			const response = await fetch(env.backendURL + "/api/board");

			if (!response.ok) throw new Error("Status: " + response.status);

			const data = await response.json();
			setBoards(data);
			setIsLoading(false);
		} catch {
			setError(true);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) return <Loader />;

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
					<BoardCell
						title={board.title}
						key={board.id}
						id={board.id}
						onNavigate={onNavigate}
						reload={fetchData}
					/>
				))}

				<AddBoard onOpen={() => setOpen(true)} />

				<AddBoardDialog
					open={open}
					onClose={() => setOpen(false)}
					reload={fetchData}
				/>
			</div>
		</div>
	);
}
