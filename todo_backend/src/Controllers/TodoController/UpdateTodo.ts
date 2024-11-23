import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import { Todo } from "../../Models/TodoSchema";

export const updateTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data = req.body;
  const id = req.query.id;

  try {
    if (!id) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please provide an ID for updating the task.",
      });
    }

    // Find and update the Todo
    const todo = await Todo.findByIdAndUpdate(
      id, // Filter by ID
      {
        title: data.title,
        isCompleted: data.isCompleted,
        description: data.description,
      },
      { new: true } // Return the updated document
    );

    if (!todo) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "Todo not found with the given ID.",
      });
    }

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo updated successfully.",
      Task: todo,
    });
  } catch (error: any) {
    console.error("Error updating todo:", error);
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "An error occurred while updating the todo.",
      error: error.message,
    });
  }
};
