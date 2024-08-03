import ButtonAdd from "./ButtonAdd";

const HeaderColumn = () => {
  return (
    <div className="flex items-center flex-shrink-0 h-10 px-2">
      <span className="block text-sm font-semibold">Backlog</span>
      <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
        6
      </span>
      <ButtonAdd />
    </div>
  );
};

export default HeaderColumn;
