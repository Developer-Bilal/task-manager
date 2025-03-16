import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers).post("/", createUser);

router.patch("/:id", updateUser).delete("/:id", deleteUser);

export default router;
