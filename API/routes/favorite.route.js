import express from "express";
import { verifyUserToken } from "../utility/verifyUserToken.js";
import {
  addToFavorites,
  getFavorites,
  deleteFavorites,
} from "../controllers/favorite.controler.js";

const router = express.Router();

router
  .route("/favitems")
  .post(verifyUserToken, addToFavorites)
  .get(verifyUserToken, getFavorites)
  .delete(verifyUserToken, deleteFavorites);

export default router;
