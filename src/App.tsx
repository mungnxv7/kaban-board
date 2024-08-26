import "./App.css";
import Column from "./components/Column";
import Header from "./components/Header";
import Title from "./components/Title";
import { ColumnType } from "./types";
import AddColumn from "./components/AddColumn";
import { generateId } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, setColumns } from "./redux/columns/columnSlice";
import { RootState } from "./redux/store";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";

function App() {
  const columns = useSelector((state: RootState) => state.column);
  const dispatch = useDispatch();
  console.log(columns);

  const columnIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const columnToAdd = () => {
    const newColumn: ColumnType = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    dispatch(addColumn(newColumn));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === active.id
    );
    const overColumIndex = columns.findIndex((column) => column.id === over.id);

    dispatch(setColumns(arrayMove(columns, activeColumnIndex, overColumIndex)));
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header />
        <Title />
        <DndContext onDragEnd={onDragEnd}>
          <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
            <SortableContext items={columnIds}>
              {columns.map((column) => (
                <Column key={column.id} column={column} />
              ))}
              <AddColumn addColumn={columnToAdd} />
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </>
  );
}

export default App;
