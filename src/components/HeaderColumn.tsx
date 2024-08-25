import { ChangeEvent, useState } from "react";
import ButtonAdd from "./ButtonAdd";
import { useDispatch } from "react-redux";
import { setTitleColumn } from "../redux/columns/columnSlice";

interface HeaderColumnProps {
  title: string;
  quantityColumn: number;
  id: number;
  onClick: () => void;
}

const HeaderColumn = ({
  title,
  id,
  quantityColumn,
  onClick,
}: HeaderColumnProps) => {
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [textTitle, setTextTitle] = useState<string>(title ?? "");

  const onSetEditTitle = () => {
    setIsEditTitle(true);
  };

  const onBlurInputTitle = () => {
    setIsEditTitle(false);
    dispatch(setTitleColumn({ id: id, title: textTitle }));
  };

  const onChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextTitle(value);
  };

  return (
    <div className="flex items-center flex-shrink-0 h-10 px-2">
      <div>
        {isEditTitle ? (
          <input
            name="title"
            className="h-8 rounded-md p-1 bg-transparent outline outline-2 outline-blue-500"
            value={textTitle}
            onBlur={onBlurInputTitle}
            onChange={onChangeInputTitle}
          />
        ) : (
          <>
            <span
              className="text-sm font-semibold inline-flex cursor-pointer"
              onClick={onSetEditTitle}
            >
              {title}
            </span>
            <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
              {quantityColumn}
            </span>
          </>
        )}
      </div>
      <ButtonAdd onClick={onClick} />
    </div>
  );
};

export default HeaderColumn;
