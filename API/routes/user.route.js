import express from "express";
import { userProfileUpdate } from "../controllers/user.controler.js";

const router = express.Router();

router.route("/account/:id").post(userProfileUpdate);

export default router;
