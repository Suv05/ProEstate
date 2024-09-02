import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//connection import
import createConnection from "./DB/connect.js";

//routes config
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingsRoute from "./routes/listings.route.js";
import favoriteRoute from "./routes/favorite.route.js";

//import error-handeler
import { errorHandler } from "./middlewares/errorHandeler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listings", listingsRoute);
app.use("/api/v1/favorite", favoriteRoute);

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
