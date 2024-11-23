import { useState } from "react";
import TodoServices from "../apiServices/todoServices";

import { useNavigate } from "react-router-dom";

const useFetchTodo = () => {
  const [loading, setLoading] = useState(false);

  const fetchTodo = async () => {
    try {
      setLoading(true);
      await TodoServices.fetchTodo().then((res: any) => {
        if (res.success == true) {
          console.log("resp from useFetchTodo  : ", res);
        } else {
          console.log(res.err);
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.log("Error in useFetchTodo Hook : ", err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchTodo };
};

export default useFetchTodo;
