import "./App.css";
import Column from "./components/Colums";
import Header from "./components/Header";
import Title from "./components/Title";

function App() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header />
        <Title />
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <Column />
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </div>
    </>
  );
}

export default App;
