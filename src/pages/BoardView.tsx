import { createContext, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Board } from "@/components/Board";
import { env } from "@/config";
import { useError } from "@/customhooks/useError";
import { BoardType } from "@/interfaces/board.model";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Loader } from "@/components/Loader";

export const BoardContext = createContext(() => {});

export function BoardView() {
	const { setError } = useError();
	const [board, setBoard] = useState<BoardType>();
	const [notFound, setNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	const getData = async () => {
		try {
			const response = await fetch(env.backendURL + "/api/board/" + id);

			if (response.status === 404) {
				setNotFound(true);
				return;
			}
			if (!response.ok) throw new Error("Status: " + response.status);

			const data = await response.json();
			setBoard(data);
			setIsLoading(false);
		} catch {
			setError(true);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	if (isLoading) return <Loader />;

	if (notFound)
		return (
			<NotFound title="The board you are looking for does not exist or may have been removed." />
		);

	return (
		<BoardContext value={getData}>
			<div className="flex min-h-screen flex-col">
				<Header />
				<main className="flex-1 overflow-auto p-4 md:p-6">
					{board && <Board columns={board.columns} title={board.title} />}
				</main>
			</div>
		</BoardContext>
	);
}
