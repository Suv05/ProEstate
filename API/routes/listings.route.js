import express from "express";

import { createListings } from "../controllers/listings.controler";
import { verifyUserToken } from "../utility/verifyUserToken";

const router = express.Router();

router.route("/new").post(verifyUserToken, createListings);

export default router;
