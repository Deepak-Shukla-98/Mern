import express from "express";
import { Home, Profile, calendar, updateProfile } from "../controllers/home.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/home", verifyToken, Home);
router.get("/profile", verifyToken, Profile);
router.put("/profile/:id", verifyToken, updateProfile);
router.get("/calendar", verifyToken, calendar);

export default router;
