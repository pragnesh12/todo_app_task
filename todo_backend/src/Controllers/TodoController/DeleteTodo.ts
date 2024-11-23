import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import { Todo } from "../../Models/TodoSchema";

export const deleteTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const id: any = req.query.id;

  try {
    if (!id) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide Id For Deleting The Task",
      });
    }

    const deletedTodo = await Todo.deleteOne({
      _id: id,
    });

    console.log("Successfully Deleted A Todo : ", deletedTodo);
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
