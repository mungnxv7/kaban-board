import ButtonAdd from "./ButtonAdd";

interface ButtonAddProps {
  addColumn: () => void;
}

const AddColumn = ({ addColumn }: ButtonAddProps) => {
  return (
    <div className="flex justify-between items-center flex-shrink-0 w-72 px-1 bg-[#ffffff]/40 h-max rounded-md">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Thêm cột</span>
      </div>
      <ButtonAdd onClick={addColumn} />
    </div>
  );
};

export default AddColumn;
