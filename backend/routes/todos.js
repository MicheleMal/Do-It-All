import express from "express";
import { addTodo, getAllTodoByIdUser, modifyCompleted, deleteTodo, modifyTodo } from "../controllers/todos.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all todo of a specific user
router.get("/get", authenticateToken, getAllTodoByIdUser);

// Added new todo
router.post("/add", authenticateToken, addTodo);

router.patch("/modify/:id", authenticateToken, modifyTodo)

router.patch("/completed/:id", authenticateToken, modifyCompleted);

router.delete("/delete/:id", authenticateToken, deleteTodo)

export default router;
