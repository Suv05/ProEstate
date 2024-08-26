import express from "express";
import { searchFunctionality } from "../controllers/listings.controler.js";

const router = express.Router();

// For advanced search functionality
router.route("/search").get(searchFunctionality);

export default router;
