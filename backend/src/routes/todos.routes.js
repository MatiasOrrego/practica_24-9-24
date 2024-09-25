import { Router } from "express";
import { getAllTodosCtrl, createTodoCtrl, updateTodoCtrl, deleteTodoCtrl } from "../controllers/todos.controllers.js";
import validarJWT from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJWT , getAllTodosCtrl);
todosRouter.post("/",validarJWT , createTodoCtrl);
todosRouter.put("/:id",validarJWT , updateTodoCtrl);
todosRouter.delete("/:id",validarJWT , deleteTodoCtrl);

export { todosRouter };
