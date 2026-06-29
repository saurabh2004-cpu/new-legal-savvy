import { Router } from "express";
import {
  createLabel,
  getAllLabels,
  getSingleLabel,
  updateLabel,
  deleteLabel,
  getLabelByType
} from "../controllers/label.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-label", protectAdmin, createLabel);
router.get("/get-all-labels", getAllLabels);
router.get("/get-label-by-id/:id", getSingleLabel);
router.put("/update-label/:id", protectAdmin, updateLabel);
router.delete("/delete-label/:id", protectAdmin, deleteLabel);
router.get("/get-label-by-type/:type", getLabelByType);

export default router;
