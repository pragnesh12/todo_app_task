import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import { SubTodo } from "../../Models/SubTodoSchema";

export const updateSubTodo: RequestHandler = async (
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

    // Find and update the SubTodo
    const subTodo = await SubTodo.findByIdAndUpdate(
      id, // Filter by ID
      {
        subTitle: data.subTitle,
        isSubCompleted: data.isSubCompleted,
      }
    );

    if (!subTodo) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "SubTodo not found with the given ID.",
      });
    }

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "SubTodo updated successfully.",
      Task: subTodo,
    });
  } catch (error: any) {
    console.error("Error updating SubTodo:", error);
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "An error occurred while updating the SubTodo.",
      error: error.message,
    });
  }
};
