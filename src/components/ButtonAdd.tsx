import AddIcon from "../svgs/AddIcon";

const ButtonAdd = () => {
  return (
    <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
      <AddIcon />
    </button>
  );
};

export default ButtonAdd;
