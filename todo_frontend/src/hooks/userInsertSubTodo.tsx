import { useContext, useState } from "react";
import TodoServices from "../apiServices/todoServices";

import { useNavigate } from "react-router-dom";

const useInsertSubTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface SubTodoInterface {
    subTitle: string;
    todoId: string;
  }

  const insertSubTodo = async (data: SubTodoInterface) => {
    try {
      setLoading(true);
      const response = await TodoServices.insertSubTodo(data);

      if (response.success) {
        console.log("Response from useInsertSubTodo:", response);
        return response; // Return the response here
      } else {
        console.error(response.message);
      }
    } catch (err: any) {
      console.error("Error in useInsertSubTodo Hook:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, insertSubTodo };
};

export default useInsertSubTodo;
