import express from "express";

import { createListings } from "../controllers/listings.controler.js";
import { verifyUserToken } from "../utility/verifyUserToken.js";

const router = express.Router();

router.route("/new").post(verifyUserToken, createListings);

export default router;
