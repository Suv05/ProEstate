import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import Listings from "../models/listings.model.js";
import User from "../models/user.model.js";

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
  const ownerContact = await User.findById(listing.userRef);
  const email = ownerContact.email;
  return res.status(StatusCodes.OK).json({ listing, email });
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
  const limit = parseInt(req.query.limit) || 32; // Default limit to 4 if not provided
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
  const limit = parseInt(req.query.limit) || 32; // Default limit to 4 if not provided
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1; // Sort ascending or descending based on query parameter

  const listings = await Listings.find({})
    .sort({ regularPrice: sortOrder }) // Sort by the `regularPrice` field
    .limit(limit);

  if (!listings || listings.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "No listings found" });
  }

  return res.status(StatusCodes.OK).json({ listings });
};