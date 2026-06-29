import { Router } from "express";
import {
  importKeywords,
  getAllKeywords,
  updateKeyword,
  deleteKeyword,
} from "../controllers/keyword.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { uploadCSV } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/import-csv", protectAdmin, uploadCSV.single("file"), importKeywords);
router.get("/get-all-keywords", protectAdmin, getAllKeywords);
router.put("/update-keyword/:id", protectAdmin, updateKeyword);
router.delete("/delete-keyword/:id", protectAdmin, deleteKeyword);

export default router;
