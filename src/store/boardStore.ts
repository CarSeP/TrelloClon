import { env } from "@/config";
import { BoardType, CardType, ColumnType } from "@/interfaces/board.model";
import { create } from "zustand";

interface boardInterface {
  board: BoardType;

  setBoard: (board: BoardType) => void;
  addColumn: (column: ColumnType) => void;
  addCard: (columnId: number, card: CardType) => void;
}

const boardDefaulData: BoardType = {
  id: 0,
  title: "",
  columns: [],
};

const safeBoard = (board: BoardType) => {
  localStorage.setItem(env.key, JSON.stringify(board));
  return board;
};

export const useBoardStore = create<boardInterface>((set) => ({
  board: boardDefaulData,

  setBoard: (board) => set(() => ({ board })),
  addColumn: (column) =>
    set((state) => ({
      board: safeBoard({
        ...state.board,
        columns: state.board.columns.concat(column),
      }),
    })),
  addCard: (columnId: number, card: CardType) =>
    set((state) => {
      const columns = state.board.columns.map((column) => {
        if (column.id === columnId) column.cards = column.cards.concat(card);
        return column;
      });
      return { board: safeBoard({ ...state.board, columns }) };
    }),
}));
