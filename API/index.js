import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("conneted to db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json()); // Ensure this line is present to parse JSON request bodies

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error ";
  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
