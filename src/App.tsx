import "./App.css";
import Column from "./components/Column";
import Header from "./components/Header";
import Title from "./components/Title";
import { ColumnType, ICardItem } from "./types";
import AddColumn from "./components/AddColumn";
import { generateId } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addColumn,
  setColumns,
  setColumnsDrag,
} from "./redux/columns/columnSlice";
import { RootState } from "./redux/store";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import CardItem from "./components/CardItem";

function App() {
  const [isActiveColumn, setIsActiveColumn] = useState<ColumnType | null>(null);
  const [isActiveTask, setIsActiveTask] = useState<ICardItem | null>(null);
  const columns = useSelector((state: RootState) => state.column);
  const dispatch = useDispatch();

  const columnIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const columnToAdd = () => {
    const newColumn: ColumnType = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      children: [],
    };
    dispatch(addColumn(newColumn));
  };

  const findValueOfItems = (id: UniqueIdentifier, type: string) => {
    if (type === "column") {
      return columns.find((column) => column.id === id);
    }
    if (type === "task") {
      return columns.find((column) =>
        column.children.find((item) => item.id === id)
      );
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "column") {
      setIsActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "task") {
      setIsActiveTask(event.active.data.current.card);
      return;
    }
  };

  const onDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    // Handle Items Sorting
    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "task");
      const overContainer = findValueOfItems(over.id, "task");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.children.findIndex(
        (item) => item.id === active.id
      );

      const overitemIndex = overContainer.children.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        const newArray = arrayMove(
          columns[activeContainerIndex].children,
          activeitemIndex,
          overitemIndex
        );
        dispatch(
          setColumnsDrag({ index: activeContainerIndex, children: newArray })
        );
      } else {
        // In different containers
        const newItems = columns.map((column) => ({
          ...column,
          children: [...column.children],
        }));

        const [removedItem] = newItems[activeContainerIndex].children.splice(
          activeitemIndex,
          1
        );

        newItems[overContainerIndex].children.splice(
          overitemIndex,
          0,
          removedItem
        );
        dispatch(setColumns(newItems));
      }
    }

    // Handling Item Drop Into a Container
    // if (
    //   active.data.current?.type === "item" &&
    //   over?.data.current?.type === "container" &&
    //   active &&
    //   over &&
    //   active.id !== over.id
    // ) {
    //   // Find the active and over container
    //   const activeContainer = findValueOfItems(active.id, "item");
    //   const overContainer = findValueOfItems(over.id, "container");

    //   // If the active or over container is not found, return
    //   if (!activeContainer || !overContainer) return;

    //   // Find the index of the active and over container
    //   const activeContainerIndex = columns.findIndex(
    //     (container) => container.id === activeContainer.id
    //   );
    //   const overContainerIndex = columns.findIndex(
    //     (container) => container.id === overContainer.id
    //   );

    //   // Find the index of the active and over item
    //   const activeitemIndex = activeContainer.children.findIndex(
    //     (item) => item.id === active.id
    //   );

    //   // Remove the active item from the active container and add it to the over container
    //   const newItems = [...columns];
    //   const [removeditem] = newItems[activeContainerIndex].children.splice(
    //     activeitemIndex,
    //     1
    //   );
    //   newItems[overContainerIndex].children.push(removeditem);
    //   console.log(newItems);
    // }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event);
  };
  return (
    <>
      <div className="text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header />
        <Title />
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragMove={onDragMove}
        >
          <div className="flex w-screen px-10 mt-4 space-x-6 overflow-auto h-screen">
            <SortableContext items={columnIds}>
              {columns.map((column) => (
                <Column key={column.id} column={column} />
              ))}
              <AddColumn addColumn={columnToAdd} />
            </SortableContext>
          </div>
          <DragOverlay adjustScale={false}>
            {isActiveColumn && <Column column={isActiveColumn} />}
            {isActiveTask && <CardItem card={isActiveTask} />}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default App;
