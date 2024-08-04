import HeaderColumn from "./HeaderColumn";
import ColumnContent from "./ColumnContent";

const Colums = () => {
  return (
    <div className="flex flex-col flex-shrink-0 w-72 px-1">
      <HeaderColumn />
      <ColumnContent />
    </div>
  );
};

export default Colums;
