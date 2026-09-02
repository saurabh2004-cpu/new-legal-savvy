import { Router } from "express";
import {
  createLabel,
  getAllLabels,
  getSingleLabel,
  updateLabel,
  deleteLabel,
  getLabelByType,
  importLabels,
} from "../controllers/label.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingleImage, uploadExcel } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/create-label", protectAdmin, uploadSingleImage("image"), createLabel);
router.get("/get-all-labels", getAllLabels);
router.get("/get-label-by-id/:id", getSingleLabel);
router.put("/update-label/:id", protectAdmin, uploadSingleImage("image"), updateLabel);
router.delete("/delete-label/:id", protectAdmin, deleteLabel);
router.get("/get-label-by-type/:type", getLabelByType);
router.post("/import", protectAdmin, uploadExcel.single("file"), importLabels);

export default router;
