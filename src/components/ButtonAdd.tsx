import AddIcon from "../svgs/AddIcon";

interface ButtonAddProps {
  onClick: () => void;
}

const ButtonAdd = ({ onClick }: ButtonAddProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
    >
      <AddIcon />
    </button>
  );
};

export default ButtonAdd;
