import { useSortable } from "@dnd-kit/sortable";
import Priority from "./Priority";
import { FormAction, ICardItem } from "../types";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import penEdit from "../assets/pen-new.svg";
import trashIcon from "../assets/trash.svg";
import { useDispatch } from "react-redux";
import { deleteChildrenItem } from "../redux/columns/columnSlice";

interface Props {
  card: ICardItem;
  onEdit: (data: FormAction) => void;
  idColumn: number;
}

const CardItem = ({ card, onEdit, idColumn }: Props) => {
  const dispatch = useDispatch();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "task",
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const deleteCard = () => {
    dispatch(deleteChildrenItem({ idColumn, idChildren: card.id }));
  };

  return (
    <div className="relative group">
      <div
        className={`flex flex-col gap-2 p-4 bg-white rounded-lg bg-opacity-90 ${
          isDragging && "opacity-50 border border-indigo-300 group"
        }`}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        {card.priority && <Priority priority={card.priority} />}
        <h4 className="text-sm font-medium">{card.title}</h4>
        {(card.startDate || card.endDate) && (
          <div className="flex items-center w-full text-xs font-medium text-gray-400">
            {card.startDate && (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-300 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="ml-1 leading-none">
                  {moment(card.startDate).format("MMM D")}
                </span>
              </div>
            )}
            {card.endDate && (
              <div className="flex items-center ml-3">
                <p className="mr-3">-</p>
                <svg
                  className="w-4 h-4 text-gray-300 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="ml-1 leading-none">
                  {moment(card.endDate).format("MMM D")}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute top-2 right-2 hidden group-hover:flex z-50 items-center gap-2">
        <div
          className=""
          onClick={() =>
            onEdit({ isOpen: true, idColumn: idColumn, idChildren: card.id })
          }
        >
          <img width={20} src={penEdit} alt="" />
        </div>
        <div onClick={deleteCard}>
          <img width={20} src={trashIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
