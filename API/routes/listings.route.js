import express from "express";
import {
  searchFunctionality,
  getAllListings,
  getSingleListing,
} from "../controllers/listings.controler.js";

const router = express.Router();

// For advanced search functionality
router.route("/search").get(searchFunctionality);
router.route("/").get(getAllListings);
router.route("/:id").get(getSingleListing);
export default router;
