import express from "express";
import { getJwtCookie, login, register } from "../controllers/auth.js";

const router = express.Router();

// Register -> create new account
router.post("/register", register);

// Login
router.post("/login", login);

router.get("/cookie/jwt", getJwtCookie);

export default router;
