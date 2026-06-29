import { Router } from "express";
import {
  createAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-address", protectAdmin, createAddress);
router.get("/get-all-addresses", getAllAddresses);
router.get("/get-address-by-id/:id", getSingleAddress);
router.put("/update-address/:id", protectAdmin, updateAddress);
router.delete("/delete-address/:id", protectAdmin, deleteAddress);

export default router;
