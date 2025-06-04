import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoardsGrid } from "./pages/BoardsGrid";
import { BoardView } from "./pages/BoardView";
import { Login } from "./pages/Login";
import { createContext, useState } from "react";
import { ErrorContextType } from "./interfaces/errorContext.model";
import { ErrorDialog } from "./components/ErrorDialog";
import { NotFound } from "./pages/NotFound";

export const ErrorContext = createContext<ErrorContextType | undefined>(
	undefined
);

function App() {
	const [error, setError] = useState(false);
	return (
		<ErrorContext.Provider value={{ error, setError }}>
			<ErrorDialog />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/board" element={<BoardsGrid />} />
					<Route path="/board/:id" element={<BoardView />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ErrorContext.Provider>
	);
}

export default App;
