import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/admin.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protectAdmin, getCurrentAdmin);

export default router;
