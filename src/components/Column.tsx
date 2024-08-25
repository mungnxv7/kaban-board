import HeaderColumn from "./HeaderColumn";
import ColumnContent from "./ColumnContent";
import { ColumnType } from "../types";

interface ColumnProps {
  column: ColumnType;
}

const Column = ({ column }: ColumnProps) => {
  const addChildren = () => {};

  return (
    <div className="flex flex-col flex-shrink-0 w-72 px-1">
      <HeaderColumn
        id={column.id}
        title={column.title}
        quantityColumn={column?.children?.length ?? 0}
        onClick={addChildren}
      />
      <ColumnContent />
    </div>
  );
};

export default Column;
