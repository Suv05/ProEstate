import "express-async-errors";
import { StatusCodes } from "http-status-codes";

import AppError from "../error/AppError.js";

import Listings from "../models/listings.model.js";

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
