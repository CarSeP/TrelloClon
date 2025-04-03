import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Board } from "./components/Board";
import { BoardType } from "./interfaces/board.model";

const KeyLocalStorage = "dataItems";

function App() {
  const [boardData, setBoardData] = useState<BoardType>();

  const getData = () => {
    const data = localStorage.getItem(KeyLocalStorage);
    if (data) setBoardData(JSON.parse(data));
    if (data) console.log(JSON.parse(data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {boardData && (
          <Board columns={boardData.columns} title={boardData.title} />
        )}
      </main>
    </div>
  );
}

export default App;
