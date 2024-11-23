import { RequestHandler } from "express";
import { Todo } from "../../Models/TodoSchema";
import { StatusCode } from "../../Helpers/StatusCodes";

export const fetchTodoById: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const id = req.query.id; // Access the ID from URL params

  try {
    // Check if ID is provided
    if (!id) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "Please Provide Id For Finding Todo!",
      });
    }

    // Fetch the Todo by its ID and populate SubTodo if needed
    const todo = await Todo.findById(id).populate({
      path: "SubTodo", // Populate the SubTodo array (if needed)
      options: {
        sort: { subTitle: -1 }, // Optionally sort SubTodo by subTitle
      },
    });

    // If Todo not found, send an appropriate message
    if (!todo) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "Provided Todo Id Is Not Valid!",
      });
    }

    // Successfully found the Todo
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo fetched successfully.",
      Task: todo,
    });
  } catch (error: any) {
    console.error("Error fetching todo:", error);
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "An error occurred while fetching the Todo.",
    });
  }
};
