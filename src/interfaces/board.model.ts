export interface BoardType {
  id: string;
  title: string;
  columns: ColumnType[];
}

export interface ColumnType {
  id: number;
  title: string;
  cards: CardType[];
}

export interface CardType {
  id: number;
  title: string;
  description: string;
  date: string;
}
