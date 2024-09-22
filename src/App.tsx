import "./App.css";
import Column from "./components/Column";
// import Header from "./components/Header";
import Title from "./components/Title";
import { ColumnType, FormAction, FormCard, ICardItem } from "./types";
import AddColumn from "./components/AddColumn";
import { generateId } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addChildrenColumn,
  addColumn,
  setColumns,
  setColumnsDrag,
  updateChildrenColumn,
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
import FromTask from "./components/FromTask";

function App() {
  const [isActiveColumn, setIsActiveColumn] = useState<ColumnType | null>(null);
  const [isActiveTask, setIsActiveTask] = useState<ICardItem | null>(null);
  const [formAction, setFormAction] = useState<FormAction>({
    isOpen: false,
    idColumn: 0,
  });
  const [updateCard, setUpdateCard] = useState<ICardItem | null>(null);
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

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "task");
      const overContainer = findValueOfItems(over.id, "task");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.children.findIndex(
        (item) => item.id === active.id
      );

      const overitemIndex = overContainer.children.findIndex(
        (item) => item.id === over.id
      );

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
    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      console.log("container");

      const activeContainer = findValueOfItems(active.id, "task");
      const overContainer = findValueOfItems(over.id, "column");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.children.findIndex(
        (item) => item.id === active.id
      );

      const newItems = columns.map((column) => ({
        ...column,
        children: [...column.children],
      }));

      const [removeitem] = newItems[activeContainerIndex].children.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].children.push(removeitem);
      dispatch(setColumns(newItems));
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (
      active.data.current?.type === "column" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === over.id
      );

      let newItems = [...columns];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      dispatch(setColumns(newItems));
    }

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.children.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.children.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...columns];
        newItems[activeContainerIndex].children = arrayMove(
          newItems[activeContainerIndex].children,
          activeitemIndex,
          overitemIndex
        );
        dispatch(setColumns(newItems));
      } else {
        const newItems = [...columns];
        const [removeditem] = newItems[activeContainerIndex].children.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].children.splice(
          overitemIndex,
          0,
          removeditem
        );
        dispatch(setColumns(newItems));
      }
    }

    if (
      active.data.current?.type === "task" &&
      over?.data.current?.type === "column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.children.findIndex(
        (item) => item.id === active.id
      );
      const newItems = [...columns];
      const [removeditem] = newItems[activeContainerIndex].children.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].children.push(removeditem);
      dispatch(setColumns(newItems));
    }
  };

  const handleFormAction = (action: FormAction) => {
    setFormAction(action);
    const findIndexColumn = columns.findIndex(
      (column) => column.id === action.idColumn
    );
    if (action.idChildren) {
      const cardItem = columns[findIndexColumn].children.find(
        (card) => card.id === action.idChildren
      );
      setUpdateCard(cardItem ?? null);
    }
  };

  const handleSubmitForm = (data: FormCard) => {
    if (formAction.idChildren) {
      const newCard: ICardItem = {
        id: formAction.idChildren,
        ...data,
      };
      dispatch(
        updateChildrenColumn({
          columnId: formAction.idColumn,
          children: newCard,
        })
      );
    } else {
      const id = generateId();
      const newCard: ICardItem = {
        id,
        ...data,
      };
      dispatch(
        addChildrenColumn({ columnId: formAction.idColumn, children: newCard })
      );
    }
    setFormAction({ isOpen: false, idColumn: 0, idChildren: undefined });
    setUpdateCard(null);
  };

  return (
    <>
      <div className="text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200  h-screen">
        {/* <Header /> */}
        <Title />
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragMove={onDragMove}
        >
          <SortableContext items={columnIds}>
            <div className="flex w-screen px-10 mt-4 space-x-6 overflow-auto">
              {columns.map((column) => (
                <Column
                  addChildren={handleFormAction}
                  key={column.id}
                  column={column}
                />
              ))}
              <AddColumn addColumn={columnToAdd} />
            </div>
          </SortableContext>
          <DragOverlay adjustScale={false}>
            {isActiveColumn && (
              <Column addChildren={handleFormAction} column={isActiveColumn} />
            )}
            {isActiveTask && (
              <CardItem
                card={isActiveTask}
                idColumn={0}
                onEdit={handleFormAction}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
      {formAction.isOpen && (
        <FromTask submit={handleSubmitForm} dataCard={updateCard} />
      )}
    </>
  );
}

export default App;
