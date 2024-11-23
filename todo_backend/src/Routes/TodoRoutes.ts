import express from "express";
import { insertTodo } from "../Controllers/TodoController/InsertTodo";
import { updateTodo } from "../Controllers/TodoController/UpdateTodo";
import { fetchTodos } from "../Controllers/TodoController/FetchTodos";
import { fetchTodoById } from "../Controllers/TodoController/FetchTodoById";
import { deleteTodo } from "../Controllers/TodoController/DeleteTodo";
import { insertSubTodo } from "../Controllers/SubTodoController/InsertSubTodo";
import { updateSubTodo } from "../Controllers/SubTodoController/UpdateSubTodo";
import { deleteSubTodo } from "../Controllers/SubTodoController/DeleteSubTodo";

const Router = express.Router();

Router.post("/add-todo", insertTodo);
Router.post("/add-sub-todo", insertSubTodo);
Router.put("/update-todo", updateTodo);
Router.put("/update-sub-todo", updateSubTodo);
Router.get("/fetch-todos", fetchTodos);
Router.get("/tasks", fetchTodoById);
Router.delete("/delete-todo", deleteTodo);
Router.delete("/delete-sub-todo", deleteSubTodo);

export default Router;
