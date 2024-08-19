import "express-async-errors";
import { StatusCodes } from "http-status-codes";

//for throw errors
import NotFoundError from "../error/NotFoundError.js";
import AppError from "../error/AppError.js";

//imported user model
import User from "../models/user.model.js";

export const userProfileUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    throw new AppError(
      "You don't have access to this account",
      StatusCodes.FORBIDDEN
    );
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        avtar: req.body.avtar,
      },
    },
    { new: true }
  );

  delete updateUser._doc.password;

  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "Sucessfuly update account information", updateUser });
};
