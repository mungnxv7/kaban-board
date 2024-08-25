import "./App.css";
import Column from "./components/Column";
import Header from "./components/Header";
import Title from "./components/Title";
import { ColumnType } from "./types";
import AddColumn from "./components/AddColumn";
import { generateId } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { addColumn } from "./redux/columns/columnSlice";
import { RootState } from "./redux/store";

function App() {
  const columns = useSelector((state: RootState) => state.column);
  const dispatch = useDispatch();

  const columnToAdd = () => {
    const newColumn: ColumnType = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    dispatch(addColumn(newColumn));
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header />
        <Title />
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <AddColumn addColumn={columnToAdd} />
        </div>
      </div>
    </>
  );
}

export default App;
