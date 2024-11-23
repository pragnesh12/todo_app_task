import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { useNavigate } from "react-router-dom";

const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);

  const deleteTodo = async (id: any) => {
    try {
      setLoading(true);
      await TodoServices.deleteTodo(id).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useDeleteTodo  : ", res);
          return res;
        } else {
          console.log(res.err);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useDeleteTodo Hook : ", err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteTodo };
};

export default useDeleteTodo;
