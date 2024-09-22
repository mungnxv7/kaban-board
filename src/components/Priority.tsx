import { Priority as PriorityType } from "../types";

interface Props {
  priority: PriorityType;
}

const Priority = ({ priority }: Props) => {
  return (
    <span
      className={`flex items-center w-max h-6 px-3 text-xs font-semibold bg-pink-100 rounded-full capitalize ${
        priority === "high" && "text-pink-500"
      } ${priority === "low" && "text-green-400"} ${
        priority === "medium" && "text-orange-500"
      }`}
    >
      {priority}
    </span>
  );
};

export default Priority;
