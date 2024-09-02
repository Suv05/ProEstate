import express from "express";
import { verifyUserToken } from "../utility/verifyUserToken.js";
import { addToFavorites, getFavorites } from "../controllers/favorite.controler.js";

const router = express.Router();

router.route("/favitems").post(verifyUserToken, addToFavorites);
router.route("/favitems").get(verifyUserToken, getFavorites);

export default router;
