type IdType = number;

export interface ColumnType {
  id: IdType;
  title: string;
  children?: [];
}

export interface ColumnAction {
  id: IdType;
  title: string;
}
