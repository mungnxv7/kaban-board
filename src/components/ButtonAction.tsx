import ThreeDot from "../svgs/ThreeDot";

const ButtonAction = () => {
  return (
    <button className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
      <ThreeDot />
    </button>
  );
};

export default ButtonAction;
