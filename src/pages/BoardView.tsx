import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Board } from "@/components/Board";
import { useBoardStore } from "@/store/boardStore";
import { env } from "@/config";

export function BoardView() {
	const { board, setBoard } = useBoardStore((store) => store);

	const getData = () => {
		const data = localStorage.getItem(env.key);
		if (data) setBoard(JSON.parse(data));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 overflow-auto p-4 md:p-6">
				{board && <Board columns={board.columns} title={board.title} />}
			</main>
		</div>
	);
}
