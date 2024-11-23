import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../../store/todoStore";
import { useParams } from "react-router-dom";
import useInsertSubTodo from "../../hooks/userInsertSubTodo";
import SubDescription from "./SubDescription";

const SubTodo = () => {
  const [subtasks, setSubtasks] = useState<{
    subTitle: string;
    todoId: string;
    isSubCompleted: boolean;
  }>({
    subTitle: "",
    todoId: "",
    isSubCompleted: false,
  });
  const [subTodo, setSubTodo] = useState<any[]>([]); // State to hold subTodos for real-time updates
  const [newSubtask, setNewSubtask] = useState("");
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [show, setShow] = useState<boolean>(false);

  const { id } = useParams();
  const { todo } = useContext(TodoContext);
  const { loading, insertSubTodo } = useInsertSubTodo();

  // Populate subTodo based on matching todoId
  useEffect(() => {
    const matchedSubTodos: any = [];
    todo.forEach((todoItem: any) => {
      if (todoItem.SubTodo && Array.isArray(todoItem.SubTodo)) {
        matchedSubTodos.push(
          ...todoItem.SubTodo.filter((sub: any) => id === sub.todoId)
        );
      }
    });
    setSubTodo(matchedSubTodos);
  }, [todo, id]);

  const handleAddButton = async () => {
    try {
      const response: any = await insertSubTodo(subtasks);
      console.log("Response:", response);

      if (response && response.subTodo) {
        setSubTodo((prevSubTodos) => [response.subTodo, ...prevSubTodos]);
        setSubtasks({ subTitle: "", todoId: id || "", isSubCompleted: false });
      } else {
        console.error("SubTask not found in response:", response);
      }
    } catch (error) {
      console.error("Error in handleAddButton:", error);
    }
  };

  const toggleCheck = (id: string) => {
    // Toggle checked state
    setCheckedStates((prevState) => {
      const updatedCheckedStates = {
        ...prevState,
        [id]: !prevState[id],
      };

      return updatedCheckedStates;
    });
  };

  return (
    <>
      <div className="mb-4 overflow-y-auto">
        <label className="block text-sm font-medium ml-2">Subtasks</label>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={subtasks.subTitle}
              onChange={(e) =>
                setSubtasks({
                  ...subtasks,
                  subTitle: e.target.value,
                  todoId: id || "",
                })
              }
              placeholder="Add a new subtask"
              className="flex-1 bg-gray-900 bg-opacity-50 text-gray-200 rounded-md p-2 !border-none outline-none"
            />
            <button
              className="bg-gray-800 bg-opacity-50 text-gray-300 px-3 py-2 rounded-full text-sm mr-1"
              onClick={handleAddButton}
            >
              + Add
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {subTodo
              .sort((a: any, b: any) => {
                // Ensure completed tasks are at the end
                if (checkedStates[a._id] && !checkedStates[b._id]) {
                  return -1; // a is completed, so it moves to the end
                }
                if (!checkedStates[a._id] && checkedStates[b._id]) {
                  return 1; // b is completed, so it moves to the end
                }
                return 0; // Keep the order if both are either checked or unchecked
              })
              .map((subtask: any) => (
                <SubDescription
                  _id={subtask._id}
                  subTitle={subtask.subTitle}
                  isSubCompleted={subtask.isSubCompleted}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubTodo;
