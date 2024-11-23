import { RequestHandler } from "express";
import { Todo } from "../../Models/TodoSchema";
import { StatusCode } from "../../Helpers/StatusCodes";

export const fetchTodos: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  try {
    // Fetch all todos, sorted by creation date (newest first), and populate the SubTodo array
    const todos = await Todo.find()
      .sort({ createdAt: -1 }) // Order todos by createdAt descending
      .populate({
        path: "SubTodo", // Assuming 'SubTodo' is a reference in your Todo model
        options: {
          sort: { subTitle: -1 }, // Order SubTodo by subTitle descending
        },
      });

    // If no todos are found, return a specific message
    if (todos.length === 0) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "No todos found!",
      });
    }

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todos fetched successfully.",
      Task: todos,
    });
  } catch (error: any) {
    console.error("Error fetching todos:", error);
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "An error occurred while fetching todos.",
    });
  }
};
