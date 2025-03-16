import express from "express";
import userRouter from "./routes/user.route.js";

import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/users", userRouter);

// Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
