import "express-async-errors";
import { StatusCodes } from "http-status-codes";

//for throw errors
import AppError from "../error/AppError.js";

//imported user model
import User from "../models/user.model.js";
import Listings from "../models/listings.model.js";


//for update account information
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


//for create new listings
export const createListings = async (req, res, next) => {
  const listings = await Listings.create({ ...req.body });

  // Check if the listing was created successfully
  if (!listings) {
    throw new AppError(
      "Unable to create listing at this time. Please try again later.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Listing created successfuly", listings });
};