export type Priority = "normal" | "medium" | "hight";

type IdType = number;

export interface ICardItem {
  id: IdType;
  title: string;
  description?: string;
  priority?: Priority;
  startDate?: string;
  endDate?: string;
}

export interface ColumnType {
  id: IdType;
  title: string;
  children: ICardItem[];
}

export interface ColumnAction {
  id: IdType;
  title: string;
}
