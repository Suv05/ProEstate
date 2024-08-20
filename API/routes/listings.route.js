import express from "express";

import { createListings } from "../controllers/listings.controler";

const router = express.Router();

router.route("/new").post(createListings);

export default router;
