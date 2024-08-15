import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

//for throw errors
import NotFoundError from "../error/NotFoundError.js";
import UnauthError from "../error/UnauthError.js";

//imported user model
import User from "../models/user.model.js";

//signup route controller
export const signup = async (req, res, next) => {
  const user = await User.create({
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json({
    message: "User created successfully",
    user: {
      name: user.name,
    },
  });
};

//login route
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });
  if (!validUser) {
    throw new NotFoundError("User not found!😔");
  }

  const validPassword = await bcryptjs.compare(password, validUser.password);
  if (!validPassword) {
    throw new UnauthError("Invalid candidentals 🙊", StatusCodes.UNAUTHORIZED);
  }

  // Remove password before sending the user object in the response
  validUser.password = undefined;

  //create token
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res
    .cookie("access_token", token, { httpOnly: true })
    .status(StatusCodes.ACCEPTED)
    .json({
      message: "User logged in successfully",
      validUser,
    });
};
