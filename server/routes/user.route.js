import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  register,
  updateUser,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", auth, getUsers).post("/", createUser);

router.post("/register", register).post("/login", login);

router.patch("/:id", updateUser).delete("/:id", deleteUser);

export default router;
