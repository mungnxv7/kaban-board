import HeaderColumn from "./HeaderColumn";
import ColumnContent from "./ColumnContent";
import { ColumnType } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnProps {
  column: ColumnType;
  className?: string;
}

const Column = ({ column, className }: ColumnProps) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "column",
        column,
      },
    });
  const addChildren = () => {};

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`flex flex-col flex-shrink-0 w-72 px-1 ${className}`}
    >
      <HeaderColumn
        attributes={attributes}
        listeners={listeners}
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
