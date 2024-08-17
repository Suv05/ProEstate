import express from "express";
import {
  signup,
  signin,
  signinWithGoogle,
} from "../controllers/auth.controler.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(signinWithGoogle);

export default router;
