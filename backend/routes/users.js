import express from "express";
import { deleteUser, getUserById, modifyUser } from "../controllers/users.js";
import {authenticateToken} from "../middleware/auth.js"

const router = express.Router();

// Get user by id
router.get("/profile", authenticateToken, getUserById)

// Modify information
router.patch("/update", authenticateToken, modifyUser)

// Delete user
router.delete("/delete", authenticateToken, deleteUser)

export default router;