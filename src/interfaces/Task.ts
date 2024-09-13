export interface Task {
  id: number;
  title: string;
  items: TypeItem[];
}

export interface TypeItem {
  id: number;
  title: string;
  description: string;
  date: string;
}
