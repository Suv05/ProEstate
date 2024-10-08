import express from "express";
import {
  userProfileUpdate,
  createListings,
  viewListings,
  deleteListing,
  viewSingleListing
} from "../controllers/user.controler.js";
import { verifyUserToken } from "../utility/verifyUserToken.js";

const router = express.Router();

//for update account information
router.route("/:id/account").post(verifyUserToken, userProfileUpdate);

//for create new listings
router.route("/:id/new").post(verifyUserToken, createListings);

//for view your own listings
router.route("/:id/proEstate").get(verifyUserToken, viewListings);

//for delete and view a single listing
router
  .route("/:id/proEstate/:listingId")
  .delete(verifyUserToken, deleteListing)
  .get(verifyUserToken, viewSingleListing);

export default router;
