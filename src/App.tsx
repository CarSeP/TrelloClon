import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoardsGrid } from "./pages/BoardsGrid";
import { BoardView } from "./pages/BoardView";
import {Login} from "./pages/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/board" element={<BoardsGrid />} />
				<Route path="/board/:id" element={<BoardView />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
