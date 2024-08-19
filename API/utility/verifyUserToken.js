import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

//error handeler
import UnauthError from "../error/UnauthError.js";

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new UnauthError(
      "user's anuthorised access",
      StatusCodes.UNAUTHORIZED
    );
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new UnauthError("Forbidden access", StatusCodes.FORBIDDEN));
    }
    req.user = user;
    next();//to call next route handeler
  });
};
