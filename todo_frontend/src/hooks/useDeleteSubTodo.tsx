import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { useNavigate } from "react-router-dom";

const useDeleteSubTodo = () => {
  const [loading, setLoading] = useState(false);

  const deleteSubTodo = async (id: any) => {
    try {
      setLoading(true);
      await TodoServices.deleteSubTodo(id).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useDeleteSubTodo  : ", res);
          return res;
        } else {
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useDeleteSubTodo Hook : ", err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, deleteSubTodo };
};

export default useDeleteSubTodo;
