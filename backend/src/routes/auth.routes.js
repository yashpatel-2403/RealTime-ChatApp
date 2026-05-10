import express from "express";
import { Login, Logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", Login);
router.post("/logout", Logout);

router.put("/update-profile",protectRoute, updateProfile);


export default router;