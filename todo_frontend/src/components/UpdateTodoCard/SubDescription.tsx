import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../store/todoStore";

const SubDescription = ({ _id, subTitle, isSubCompleted }: any) => {
  const { handleUpdateSubTodo, handleDeleteSubTodo, setTodo } =
    useContext(TodoContext);

  // Initialize the local state with isSubCompleted value received from backend
  const [isChecked, setIsChecked] = useState(isSubCompleted);

  // This effect ensures the state updates if isSubCompleted changes
  useEffect(() => {
    setIsChecked(isSubCompleted);
  }, [isSubCompleted]);

  const toggleCheck = () => {
    const updatedStatus = !isChecked;
    setIsChecked(updatedStatus); // Optimistically update the local state
    handleUpdateSubTodo(_id, { isSubCompleted: updatedStatus }); // Send the update to the backend
  };

  const handleCancel = async (_id: string) => {
    console.log("==>", _id);
    try {
      // Optimistically update the state by removing the subtask
      setTodo((prevTodos: any) =>
        prevTodos.map((todo: any) => ({
          ...todo,
          SubTodo: todo.SubTodo?.filter((subTodo: any) => subTodo._id !== _id),
        }))
      );

      // Call the delete API
      const response: any = await handleDeleteSubTodo(_id);
      if (!response.success) {
        throw new Error("Failed to delete subtask");
      }
      console.log("Cancelled the changes");
    } catch (error) {
      console.error("Error deleting subtask: ", error);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        isChecked ? "bg-gray-700/25" : "bg-gray-700/40 bg-opacity-50"
      } text-gray-200 rounded-md hover:border p-2 hover:border-blue-400`}
    >
      <div
        className="rounded-full md:p-[0.15rem] items-center"
        onClick={toggleCheck}
      >
        {isChecked ? (
          <div
            className={`${
              isChecked && "bg-blue-400/55"
            } rounded-full md:p-[0.15rem] md:mt-[0.10rem] mt-[0.10rem]`}
          >
            <svg
              className="w-[1rem] h-[1rem] md:w-[0.80rem] md:h-[0.80rem] lg:w-[0.80rem] lg:h-[0.80rem] cursor-pointer"
              viewBox="0 0 14 12"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                stroke="currentColor"
                d="M4.959 9.263l6.792-8.015a.71.71 0 0 1 .995-.082c.3.249.34.69.09.984l-7.29 8.602a.706.706 0 0 1-.708.228.706.706 0 0 1-.483-.248L1.165 6.97a.694.694 0 0 1 .09-.987.712.712 0 0 1 .996.085l2.708 3.195z"
              />
            </svg>
          </div>
        ) : (
          <svg
            className="w-[1.20rem] h-[1.20rem] md:w-[1.30rem] md:h-[1.30rem] lg:w-[1.30rem] lg:h-[1.30rem] mt-[-0.10rem] cursor-pointer"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="14"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )}
      </div>
      <span
        className={`text-md ${
          isChecked ? "line-through text-gray-300/55" : "text-white"
        }`}
      >
        {subTitle}
      </span>

      {/* Cancel Button */}
      {isChecked && isSubCompleted && (
        <button
          onClick={() => handleCancel(_id)}
          className="ml-auto text-white px-2 py-1 rounded-md hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SubDescription;
