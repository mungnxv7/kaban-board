import { ChangeEvent, useEffect, useRef, useState } from "react";
// import ButtonAdd from "./ButtonAdd";
import { useDispatch } from "react-redux";
import { deleteColumn, setTitleColumn } from "../redux/columns/columnSlice";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import trashIcon from "../assets/trash.svg";

interface HeaderColumnProps {
  title: string;
  quantityColumn: number;
  id: number;
  listeners?: SyntheticListenerMap;
}

const HeaderColumn = ({
  title,
  id,
  quantityColumn,
  listeners,
}: HeaderColumnProps) => {
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [textTitle, setTextTitle] = useState<string>(title ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSetEditTitle = () => {
    setIsEditTitle(true);
  };

  useEffect(() => {
    if (isEditTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditTitle]);

  const onBlurInputTitle = () => {
    setIsEditTitle(false);
    dispatch(setTitleColumn({ id: id, title: textTitle }));
  };

  const onChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextTitle(value);
  };

  const onDeleteColumn = () => {
    dispatch(deleteColumn(id));
  };

  return (
    <div className="flex items-center h-10 px-2">
      <div>
        {isEditTitle ? (
          <input
            ref={inputRef}
            name="title"
            className="h-6 rounded-md p-1 text-sm bg-transparent outline outline-2 outline-blue-500"
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
      <div className="grow" {...listeners}></div>
      <div className="w-max" onClick={onDeleteColumn}>
        <img width={20} src={trashIcon} />
      </div>
    </div>
  );
};

export default HeaderColumn;
