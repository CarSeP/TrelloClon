import { useEffect } from "react";
import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { useBoardStore } from "./store/boardStore";

const KeyLocalStorage = "dataItems";

function App() {
  const { board, setBoard } = useBoardStore((store) => store);

  const getData = () => {
    const data = localStorage.getItem(KeyLocalStorage);
    if (data) setBoard(JSON.parse(data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {board && (
          <Board columns={board.columns} title={board.title} />
        )}
      </main>
    </div>
  );
}

export default App;
