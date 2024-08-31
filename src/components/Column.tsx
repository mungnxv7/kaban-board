import HeaderColumn from "./HeaderColumn";
import CardItem from "./CardItem";
import { ColumnType, ICardItem } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import AddIcon from "../svgs/AddIcon";
import { generateId } from "../utils";
import { addChildrenColumn } from "../redux/columns/columnSlice";
import { useMemo } from "react";

interface ColumnProps {
  column: ColumnType;
  className?: string;
}

const Column = ({ column, className }: ColumnProps) => {
  const dispatch = useDispatch();
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
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

  const addChildren = () => {
    const id = generateId();

    const newCart: ICardItem = {
      id,
      title: "abc",
    };
    dispatch(addChildrenColumn({ columnId: column.id, children: newCart }));
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={`flex flex-col flex-shrink-0 w-72 px-1 shadow-md bg-[#ffffff]/10 rounded-lg ${className}`}
    >
      <HeaderColumn
        attributes={attributes}
        listeners={listeners}
        id={column.id}
        title={column.title}
        quantityColumn={column?.children?.length ?? 0}
        onClick={addChildren}
      />
      <SortableContext items={childrenIds}>
        <div className="flex flex-col p-1 overflow-auto column-scroll gap-2">
          {column?.children.map((item) => (
            <CardItem key={item.id} card={item} />
          ))}
        </div>
      </SortableContext>
      <div
        className="flex items-center gap-2 bg-[#ffffff]/40 hover:bg-indigo-500 hover:text-indigo-100 p-1 mt-3 rounded-md duration-200 cursor-pointer border border-indigo-50"
        onClick={addChildren}
      >
        <AddIcon />
        <span>Add new card</span>
      </div>
    </div>
  );
};

export default Column;
