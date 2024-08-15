import "express-async-errors";
import { StatusCodes } from "http-status-codes";

//imported user model
import User from "../models/user.model.js";

//signup route controller
export const signup = async (req, res, next) => {
  const user = await User.create({
    ...req.body,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User created successfully", user });
};
