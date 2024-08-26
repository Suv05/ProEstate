import "express-async-errors";
import { StatusCodes } from "http-status-codes";

//models
import Listings from "../models/listings.model.js";

export const searchFunctionality = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 0;

  // Offer search
  let offer = req.query.offer;

  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }

  // Furnished search
  let furnished = req.query.furnished;

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  // Parking search
  let parking = req.query.parking;

  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }

  // Category
  let category = req.query.category;

  if (category === undefined || category === "all") {
    category = { $in: ["house", "apartment", "condo", "studio"] };
  }

  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  const listing = await Listings.find({
    title: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    category,
  })
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(StatusCodes.OK).json({ listing });
};
