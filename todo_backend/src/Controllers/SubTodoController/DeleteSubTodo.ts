import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import { Todo } from "../../Models/TodoSchema";
import { SubTodo } from "../../Models/SubTodoSchema";

export const deleteSubTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const subTodoId: any = req.query.id;

  try {
    if (!subTodoId) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please provide an ID for deleting the sub-task",
      });
    }

    // Find the SubTodo to get the associated Todo ID
    const subTodo = await SubTodo.findById(subTodoId);
    if (!subTodo) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "SubTodo not found",
      });
    }

    const todoId = subTodo.todoId;

    // Delete the SubTodo
    const deletedSubTodo = await SubTodo.deleteOne({ _id: subTodoId });
    if (!deletedSubTodo.deletedCount) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "Failed to delete SubTodo",
      });
    }

    // Update the Todo document by removing the SubTodo reference
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { $pull: { SubTodo: subTodoId } }, // Pull the SubTodo ID from the subTodos array
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "Associated Todo not found",
      });
    }

    console.log("Successfully Deleted SubTodo and Updated Todo:", updatedTodo);
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "SubTodo deleted and Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error deleting SubTodo:", error);
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
