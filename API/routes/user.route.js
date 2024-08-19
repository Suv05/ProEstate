import express from "express";
import { userProfileUpdate } from "../controllers/user.controler.js";
import { verifyUserToken } from "../utility/verifyUserToken.js";

const router = express.Router();

router.route("/account/:id").post(verifyUserToken, userProfileUpdate);

export default router;
