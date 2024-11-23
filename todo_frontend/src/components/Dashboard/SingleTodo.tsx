import React, { useContext, useState, useEffect, useRef } from "react";
import UpdateTodoCard from "../UpdateTodoCard/UpdateTodoCard";
import useFetchTodo from "../../hooks/useFetchTodo";
import { TodoContext } from "../../store/todoStore";
import { useNavigate } from "react-router-dom";
import TaskDescription from "./TaskDescription";

type Props = {};

const SingleTodo = (props: Props) => {
  const { loading } = useFetchTodo();
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [showAddTaskMessage, setShowAddTaskMessage] = useState<boolean | null>(
    null
  ); // Initial state is null

  const navigate = useNavigate();
  const { todo } = useContext(TodoContext);

  // Create a reference for the task input field to scroll to and focus
  const taskInputRef = useRef<HTMLInputElement>(null);

  // Effect to check if it's the first visit (i.e., no task yet)
  useEffect(() => {
    const hasSeenAddTaskMessage = localStorage.getItem("hasSeenAddTaskMessage");

    // If user has seen the message before, don't show it again
    if (hasSeenAddTaskMessage) {
      setShowAddTaskMessage(false);
    } else {
      setShowAddTaskMessage(true);
    }
  }, []);

  // Smooth scroll to the task input and focus it
  const scrollToInput = () => {
    if (taskInputRef.current) {
      taskInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      taskInputRef.current.focus(); // Focus on the input field
    }
  };

  // Handle the Add Task button click
  const handleAddTaskClick = () => {
    localStorage.setItem("hasSeenAddTaskMessage", "true"); // Mark as seen
    setShowAddTaskMessage(false); // Hide the "Add Task" message
    scrollToInput(); // Scroll to the input field
  };

  return (
    <>
      <div className={`your-container cursor-pointer md:w-[60rem] mx-auto`}>
        {todo
          .sort((a: any, b: any) => {
            if (checkedStates[a.isCompleted] && !checkedStates[b.isCompleted]) {
              return 1; // a is completed, so it moves to the end
            }
            if (!checkedStates[a.isCompleted] && checkedStates[b.isCompleted]) {
              return -1; // b is completed, so it moves to the end
            }
            return 0; // Keep the order if both are either checked or unchecked
          })
          .map((item: any) => (
            <TaskDescription
              _id={item._id}
              title={item.title}
              isCompleted={item.isCompleted}
              key={item._id}
            />
          ))}

        {!todo.length && showAddTaskMessage !== null && showAddTaskMessage && (
          <div className="flex flex-col items-center justify-center p-8 my-5 bg-gradient-to-r bg-gray-800/90 to-pink-500 rounded-xl shadow-xl text-white">
            <div className="text-3xl font-extrabold mb-4 transform scale-105">
              <span role="img" aria-label="add-task" className="text-4xl">
                🎯
              </span>
              <span>Please add your first task to get started!</span>
            </div>
            <p className="text-lg mb-4 text-white opacity-90">
              Start organizing your life by adding your first task. It's quick,
              simple, and fun!
            </p>
            <button
              className="px-8 py-3 text-lg font-semibold bg-white text-indigo-700 rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out"
              onClick={handleAddTaskClick} // Mark as seen and scroll to input
            >
              Add Task
            </button>
          </div>
        )}
      </div>

      <div ref={taskInputRef} className="mt-8">
        {showUpdateButton && (
          <div>
            <input
              type="text"
              placeholder="Enter task title"
              className="p-4 mt-4 w-full rounded-lg border-2"
            />
            <UpdateTodoCard />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleTodo;
