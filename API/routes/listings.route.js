import express from "express";
import {
  searchFunctionality,
  getAllListings,
  getSingleListing,
  getOfferListings,
  getSortListings,
  getListingsByPrice,
} from "../controllers/listings.controler.js";

const router = express.Router();

// For advanced search functionality
router.route("/search").get(searchFunctionality);

//to get all listings you can apply limit as well
router.route("/").get(getAllListings);

//to get listings with offer and limit
router.route("/offer").get(getOfferListings);

//to get listings with sort and limit
router.route("/new").get(getSortListings);

//to get listings by sort price and limit
//api/v1/listings/price?sort=price&limit=4 will work
//api/v1/listings/price?sort=price&limit=4&sortOrder=asc also work
router.route("/price").get(getListingsByPrice);

//to get single listing
router.route("/:id").get(getSingleListing);

export default router;
