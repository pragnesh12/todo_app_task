import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import { Todo } from "../../Models/TodoSchema";

export const insertTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data: any = req.body;
  try {
    if (!data.title) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide Title For The Task",
      });
    }

    const todo = await Todo.create({
      title: data.title,
      isCompleted: data.isCompleted ? data.isCompleted : false,
      description: data.description,
    });

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo Created Successfully",
      Task: todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
