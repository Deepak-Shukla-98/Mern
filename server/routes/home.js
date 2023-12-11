import express from "express";
import { Home, Profile, updateProfile } from "../controllers/home.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/home", verifyToken, Home);
router.get("/profile", verifyToken, Profile);
router.put("/profile/:id", verifyToken, updateProfile);

export default router;
