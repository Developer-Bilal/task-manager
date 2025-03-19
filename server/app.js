import express from "express";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
