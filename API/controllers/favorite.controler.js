import { StatusCodes } from "http-status-codes";
import "express-async-errors";

import Favorite from "../models/Favorite.model.js";
import Listings from "../models/listings.model.js";

export const addToFavorites = async (req, res) => {
  const { listingId } = req.body;
  const { id } = req.user;

  const favorite = await Favorite.create({
    userId: id,
    listingId,
  });

  res.status(StatusCodes.CREATED).json({ favorite });
};

export const getFavorites = async (req, res) => {
  const { id } = req.user;

  const favorites = await Favorite.find({ userId: id });
  const listings = await Listings.find({
    _id: { $in: favorites.map((fav) => fav.listingId) },
  });

  res.status(StatusCodes.OK).json({ listings });
};
