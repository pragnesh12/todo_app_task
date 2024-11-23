import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import TodoServices from "../../apiServices/todoServices";
import Home from "../../pages/Home";
import { TodoContext } from "../../store/todoStore";
import SubTask from "./SubTodo";
import useUpdateTodo from "../../hooks/useUpdateTodo";

// Define the shape of currentTodo
interface Todo {
  id?: string;
  title?: string;
  description?: string;
  done?: boolean;
  // add other properties as needed
}

const UpdateTodoCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [show, setShow] = useState({
    showForTitle: false,
    showForDesc: false,
  });
  const [selectedList, setSelectedList] = useState("Personal");
  const [currentTodo, setCurrentTodo] = useState<Todo>({});
  const navigate = useNavigate();

  let { id } = useParams();

  const { handleUpdateTodo } = useContext(TodoContext);

  useEffect(() => {
    (async () => {
      const response = await TodoServices.fetchTodoById(id).then((res: any) => {
        console.log("Hi From up : ", res.Task);
        setCurrentTodo(res.Task);
      });
    })();
  }, []);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleSelect = (list: any) => {
    setSelectedList(list);
    closeDropdown();
  };

  // Set the type of subtasks as string[]
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState("");

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks((prev) => [...prev, newSubtask]);
      setNewSubtask(""); // Clear the input after adding
    }
  };

  const { loading, updateTodo } = useUpdateTodo();

  const handleOnChange = async (data: any) => {
    await updateTodo(id, data);
  };

  return (
    <>
      <Home />
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center  mt-[-1rem] justify-center z-50 p-[10rem] ">
          <div className="bg-gray-900 text-gray-200 w-[40rem] h-[30rem] p-5 rounded-lg shadow-lg relative update-todo">
            <p className="text-blue-400 font-small md:text-[13px] text-[10px] hover:underline cursor-pointer">
              My lists {">"} Personal
            </p>
            <button
              onClick={() => {
                handleUpdateTodo(id, { isCompleted: true });
                window.location.href = "/";
              }}
              className="absolute md:top-[2.1rem] top-[2.2rem] md:right-[3.5rem] right-12 text-gray-400 hover:text-blue-400 md:text-[0.80rem] text-[0.80rem] md:mt-0 sm:mt-1"
            >
              Mark as complete
            </button>
            <button
              // onClick={()=>navigate()}
              className="absolute top-[1.68rem] right-[3.2rem] text-gray-400 hover:text-blue-400 md:text-[0.70rem] text-[0.70rem]"
            ></button>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="absolute top-6 right-3 text-gray-400 hover:text-blue-400 text-2xl "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                className="w-[28px] h-[28px] md:w-[28px] md:h-[28px] mt-1"
                viewBox="0 0 42 42"
              >
                <path
                  fill="#fa6060"
                  d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"
                />
              </svg>
            </button>

            {/* <label htmlFor="title">Title</label> */}
            <div className="flex mb-4">
              <input
                className="text-xl font-semibold bg-gray-900 bg-opacity-50 w-full mr-10 py-2 rounded-md !border-none outline-none"
                id="title"
                value={!show.showForTitle ? currentTodo.title : inputs.title} // bind to title state
                onChange={(e) => {
                  setInputs({ ...inputs, title: e.target.value });
                  setShow({ ...show, showForTitle: true });
                  handleOnChange({ title: e.target.value }); // additional logic on change
                }}
              />
            </div>

            <div className="flex gap-2 mb-4 cursor-pointer">
              <span className="bg-gray-800 bg-opacity-50 text-gray-300  px-2 py-1 rounded-full md:text-sm text-[10px]">
                🔔Remind me
              </span>
              <span
                className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full md:text-sm text-[10px]"
                onClick={openDropdown}
              >
                📁 Personal
              </span>
              <span className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full md:text-sm text-[10px]">
                # Tags
              </span>
            </div>

            <div className="mb-2">
              <label htmlFor="notes" className="block text-sm font-medium ml-2">
                Notes
              </label>
              <textarea
                id="notes"
                placeholder={"Insert your notes here"}
                className="w-full h-20 bg-gray-900 bg-opacity-50 text-gray-200 !border-none outline-none rounded-md p-2 resize-none"
                value={
                  !show.showForDesc
                    ? currentTodo.description
                    : inputs.description
                } // bind to title state
                onChange={(e) => {
                  setInputs({ ...inputs, description: e.target.value });
                  setShow({ ...show, showForDesc: true });
                  handleOnChange({ description: e.target.value }); // additional logic on change
                }}
              ></textarea>
            </div>

            <SubTask />
          </div>
        </div>
      </>
    </>
  );
};

export default UpdateTodoCard;
