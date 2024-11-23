import { useState } from "react";
import TodoServices from "../apiServices/todoServices";
import { useNavigate } from "react-router-dom";

const useUpdateTodo = () => {
  const [loading, setLoading] = useState(false);

  const updateTodo = async (id: any, data: any) => {
    console.log("-----> ", data);
    try {
      setLoading(true);
      await TodoServices.updateTodo(id, data).then((res: any) => {
        if (res.success == true) {
          console.log("resp from useUpdateTodo  : ", res);
          return res;
        } else {
          console.log("Something wrong at updatetodo");
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useUpdateTodo Hook : ", err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, updateTodo };
};

export default useUpdateTodo;
