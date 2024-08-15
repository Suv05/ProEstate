import express from "express";
import dotenv from "dotenv";

//connection import
import createConnection from "./DB/connect.js";

//routes config
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

//import error-handeler
import { errorHandler } from "./middlewares/errorHandeler.js";

dotenv.config();

const app = express();
const port = process.env.port || 3000;

//for consume json data
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

//connection with the database
createConnection(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to start the server due to MongoDB connection error:",
      error
    );
    process.exit(1);
  });
