import React, { createContext, useState, ReactNode, useEffect } from "react";
import TodoServices from "../apiServices/todoServices";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useUpdateSubTodo from "../hooks/useUpdateSubTodo";
import useDeleteSubTodo from "../hooks/useDeleteSubTodo";

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  description?: string;
  SubTodo: string[]; // Array of SubTodo IDs (references)
};

type SubTodo = {
  id: string;
  subTitle: string;
  isSubCompleted: boolean;
  todoId: string;
};

export const TodoContext = createContext<any>(null);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todo, setTodo] = useState<Todo[]>([]);

  const { deleteTodo } = useDeleteTodo();
  const { updateTodo } = useUpdateTodo();
  const { updateSubTodo } = useUpdateSubTodo();
  const { deleteSubTodo } = useDeleteSubTodo();

  useEffect(() => {
    (async () => {
      try {
        const response = await TodoServices.fetchTodo();
        const todos = response.Task;
        setTodo(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    })();
  }, []);

  const handleDeleteTodo = async (_id: string) => {
    try {
      // Optimistically remove the item from state
      setTodo((prevTodos) => prevTodos.filter((todo: any) => todo._id !== _id));

      // Call API to delete the todo
      const response: any = await deleteTodo(_id);

      // If API call fails, revert the state
      if (!response.success) {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      // Revert state in case of failure
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (id: string, updatedData: Partial<Todo>) => {
    try {
      setTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );
      const response: any = await updateTodo(id, updatedData);
      if (!response.success) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleUpdateSubTodo = async (
    id: string,
    updatedData: Partial<SubTodo>
  ) => {
    try {
      const response: any = await updateSubTodo(id, updatedData);
      if (!response.success) {
        throw new Error("Failed to update subtask");
      }
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  const handleDeleteSubTodo = async (id: string) => {
    try {
      // First find the todo containing this subTodo ID
      setTodo((prevTodos) =>
        prevTodos.map((todo) => ({
          ...todo,
          SubTodo: todo.SubTodo?.filter((subTodoId) => subTodoId !== id),
        }))
      );

      const response: any = await deleteSubTodo(id); // Only pass the id here
      if (!response.success) {
        throw new Error("Failed to delete subtask");
      }
    } catch (error) {
      console.error("Error deleting subtask:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        handleDeleteTodo,
        handleUpdateTodo,
        handleUpdateSubTodo,
        handleDeleteSubTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
