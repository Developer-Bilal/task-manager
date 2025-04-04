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

router.get("/", getUsers).post("/", createUser);

router.post("/register", register).post("/login", login);

router.patch("/:id", auth, updateUser).delete("/:id", auth, deleteUser);

export default router;
