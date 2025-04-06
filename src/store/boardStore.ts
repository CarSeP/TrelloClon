import { env } from "@/config";
import { BoardType, CardType, ColumnType } from "@/interfaces/board.model";
import { create } from "zustand";

interface boardInterface {
  board: BoardType;

  setBoard: (board: BoardType) => void;
  addColumn: (column: ColumnType) => void;
  addCard: (columnId: number, card: CardType) => void;
  moveColumn: (columnIndex: number, columnNewIndex: number) => void;
  moveCard: (
    columnIndex: number,
    columnNewIndex: number,
    cardIndex: number,
    cardNewIndex: number
  ) => void;
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
  moveColumn: (columnIndex: number, columnNewIndex: number) =>
    set((state) => {
      let columns = state.board.columns;
      const column = columns.splice(columnIndex, 1);
      columns.splice(columnNewIndex, 0, column[0]);
      return { board: safeBoard({ ...state.board, columns }) };
    }),
  moveCard: (
    columnIndex: number,
    columnNewIndex: number,
    cardIndex: number,
    cardNewIndex: number
  ) => {
    set((state) => {
      let columns = state.board.columns;
      const card = columns[columnIndex].cards.splice(cardIndex, 1);
      columns[columnNewIndex].cards.splice(cardNewIndex, 0, card[0]);
      return { board: safeBoard({ ...state.board, columns }) };
    })
  },
}));
