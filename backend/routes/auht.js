import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

// Register -> create new account
router.post("/register", register)

// Login
router.post("/login", login)

export default router;
