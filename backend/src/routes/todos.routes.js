import { Router } from "express";
import { getAllTodosCtrl } from "../controllers/todos.controllers.js";
import validarJWT from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJWT , getAllTodosCtrl);

export { todosRouter };
