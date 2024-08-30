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
  // Map sort options
  let sortField = req.query.sort || "createdAt"; // Default to createdAt if no sort is provided
  let order = req.query.order || "desc"; // Default to descending order

  if (sortField === "newCreated") {
    sortField = "createdAt";
    order = "desc"; // Ensure it sorts by newest first
  } else if (sortField === "price") {
    // Choose the appropriate field for sorting by price
    sortField = "regularPrice"; // or "discountPrice" if that's preferred
    order = "desc";
  }

  const listings = await Listings.find({
    title: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    category,
  })
    .sort({ [sortField]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(StatusCodes.OK).json({ listings });
};

//to get all listings
export const getAllListings = async (req, res, next) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
  const listings = await Listings.find({}).limit(limit);

  if (!listings || listings.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No listings found" });
  }

  return res.status(StatusCodes.OK).json({ listings });
};

//to get a single listing
export const getSingleListing = async (req, res, next) => {
  const listing = await Listings.findById(req.params.id);
  return res.status(StatusCodes.OK).json({ listing });
};
