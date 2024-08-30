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
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "No listings found" });
  }

  return res.status(StatusCodes.OK).json({ listings });
};

//to get a single listing
export const getSingleListing = async (req, res, next) => {
  const listing = await Listings.findById(req.params.id);
  return res.status(StatusCodes.OK).json({ listing });
};

// Handler function to get listings with offer=true and a limit
export const getOfferListings = async (req, res, next) => {
  const { offer, limit } = req.query;

  // Query to find listings with offer=true
  let query = {};

  if (offer === "true") {
    query.offer = true;
  }

  // Find listings based on the query and apply the limit
  const listings = await Listings.find(query).limit(Number(limit));

  if (!listings || listings.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "No listings found" });
  }

  return res.status(StatusCodes.OK).json({ listings });
};

// Handler function to get listings with sort and a limit
export const getSortListings = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 4; // Default limit to 4 if not provided
  const listings = await Listings.find({})
    .sort({ createdAt: -1 }) // Sort by the `createdAt` field in descending order (newest first)
    .limit(limit);

  if (!listings || listings.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "No listings found" });
  }

  return res.status(StatusCodes.OK).json({ listings });
};

//sort listings according to the price
export const getListingsByPrice = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 4; // Default limit to 4 if not provided
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1; // Sort ascending or descending based on query parameter

  const listings = await Listings.find({})
    .sort({ regularPrice: sortOrder }) // Sort by the `regularPrice` field
    .limit(limit);

  if (!listings || listings.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "No listings found" });
  }

  return res.status(StatusCodes.OK).json({ listings });
};
