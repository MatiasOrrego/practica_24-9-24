import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos;

  res.json({ todos });
};

export const createTodoCtrl = (req, res) => {
  const id = new Date().getTime();

  const userId = req.user.id;

  const { title, completed} = req.body;
  

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "El título es requerido" });
  }
  else if (!title > 4) {
    return res.status(400).json({ message: "El título debe tener al menos 4 caracteres" });
  } else if (!title === ""){
    return res.status(400).json({ message: "El título no puede estar vacío" });
  } else if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "El campo completed debe ser un booleano" });
  } else if (!completed === ""){
    return res.status(400).json({ message: "El campo completed es requerido" });
  }

    const newTodo ={
      id: id,
      title,
      completed,
      owner: userId, 
  }

  database.todos.push(newTodo);

  res.status(201).json({ message: "Tarea creada exitosamente", newTodo });
  
};

export const updateTodoCtrl = (req, res) => {

  const userId = req.user.id;

  const { id } = req.params;

  const { title, completed } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "El título es requerido" });
  }
  else if (!title > 4) {
    return res.status(400).json({ message: "El título debe tener al menos 4 caracteres" });
  } else if (!title === ""){
    return res.status(400).json({ message: "El título no puede estar vacío" });
  } else if (typeof completed !== "boolean") {
    return res.status(400).json({ message: "El campo completed debe ser un booleano" });
  } else if (!completed === ""){
    return res.status(400).json({ message: "El campo completed es requerido" });
  }

  const todoIndex = database.todos.findIndex((todo) => todo.id === Number(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  if (database.todos[todoIndex].owner !== userId) {
    return res.status(403).json({ message: "No puedes modificar una tarea que no creaste" });
  }

  database.todos[todoIndex] = {
    ...database.todos[todoIndex],
    title,
    completed,
  };

  res.json({ message: "Tarea actualizada exitosamente"});
};