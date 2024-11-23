import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { useNavigate } from "react-router-dom";

const useUpdateSubTodo = () => {
  const [loading, setLoading] = useState(false);

  const updateSubTodo = async (id: any, data: any) => {
    try {
      setLoading(true);
      await TodoServices.updateSubTodo(id, data).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useUpdateSubTodo  : ", res);
        } else {
          console.log("Something wrong at updatesubtodo");
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useUpdateSubTodo Hook : ", err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateSubTodo };
};

export default useUpdateSubTodo;
