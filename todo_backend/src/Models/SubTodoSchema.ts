import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema(
  {
    subTitle: { type: String, required: true },
    isSubCompleted: { type: Boolean, default: false },
    todoId: { type: mongoose.Schema.Types.ObjectId, ref: "Todo" },
  },
  { timestamps: true }
);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
