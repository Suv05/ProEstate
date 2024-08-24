import express from "express";
import {
  userProfileUpdate,
  createListings,
} from "../controllers/user.controler.js";
import { verifyUserToken } from "../utility/verifyUserToken.js";

const router = express.Router();

//for update account information
router.route("/:id/account").post(verifyUserToken, userProfileUpdate);

//for create new listings
router.route("/:id/new").post(verifyUserToken, createListings);

export default router;
