import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import Listings from "../models/listings.model.js";

export const searchFunctionality = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 0;

  // Offer search
  let offer = req.query.offer;

  if (offer === "all") {
    offer = { $in: [false, true] };
  } else if (offer === "true") {
    offer = true;
  } else {
    offer = false;
  }

  // Furnished search
  let furnished = req.query.furnished;

  if (furnished === "all") {
    furnished = { $in: [false, true] };
  } else if (furnished === "true") {
    furnished = true;
  } else {
    furnished = false;
  }

  // Parking search
  let parking = req.query.parking;

  if (parking === "all") {
    parking = { $in: [false, true] };
  } else if (parking === "true") {
    parking = true;
  } else {
    parking = false;
  }

  // Category
  let category = req.query.category;

  if (!category || category === "all") {
    category = { $in: ["house", "apartment", "condo", "studio"] };
  } else if (Array.isArray(category)) {
    category = { $in: category };
  } else {
    category = { $in: [category] };
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
