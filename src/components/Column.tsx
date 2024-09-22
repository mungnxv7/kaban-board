import HeaderColumn from "./HeaderColumn";
import CardItem from "./CardItem";
import { ColumnType, FormAction } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddIcon from "../svgs/AddIcon";
import { useMemo } from "react";

interface ColumnProps {
  column: ColumnType;
  addChildren: (action: FormAction) => void;
}

const Column = ({ column, addChildren }: ColumnProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const childrenIds = useMemo(
    () => column.children.map((column) => column.id),
    [column.children]
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      {...attributes}
      ref={setNodeRef}
      className={`w-72 px-1 rounded-lg ${isDragging && "opacity-50"}`}
    >
      <HeaderColumn
        listeners={listeners}
        id={column.id}
        title={column.title}
        quantityColumn={column?.children?.length ?? 0}
      />
      <SortableContext items={childrenIds}>
        <div className="flex flex-col p-1 gap-2">
          {column?.children.map((item) => (
            <CardItem
              key={item.id}
              card={item}
              idColumn={column.id}
              onEdit={addChildren}
            />
          ))}
        </div>
        <div
          className="flex items-center gap-2 bg-[#ffffff]/40 hover:bg-white p-1 mt-3 rounded-md duration-200 cursor-pointer border border-indigo-50"
          onClick={() => addChildren({ isOpen: true, idColumn: column.id })}
        >
          <AddIcon />
          <span className="font-medium">Add new card</span>
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
