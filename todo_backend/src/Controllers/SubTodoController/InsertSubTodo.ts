import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import { SubTodo } from "../../Models/SubTodoSchema";
import { Todo } from "../../Models/TodoSchema"; // Import the Todo model

export const insertSubTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data: any = req.body;

  try {
    // Validate subTitle
    if (!data.subTitle) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide subTitle For The Task",
      });
    }

    // Create the subTodo
    const subTodo = await SubTodo.create({
      subTitle: data.subTitle,
      isSubCompleted: data.isCompleted ? data.isCompleted : false,
      todoId: data.todoId,
    });

    // Fetch the corresponding Todo
    const todo = await Todo.findById(data.todoId);
    if (!todo) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "Todo not found",
      });
    }

    // Update the subTodos array in the Todo document
    todo.SubTodo.push(subTodo._id); // Push the SubTodo's ObjectId to the array
    await todo.save(); // Save the updated Todo document

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "subTodo Created and Added to Todo Successfully",
      subTodo: subTodo,
      updatedTodo: todo,
    });
  } catch (error) {
    console.error("Error creating or updating subTodo:", error);
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
