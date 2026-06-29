import { Router } from "express";
import {
  createPageContent,
  getAllPageContents,
  getPageContentBySlug,
  updatePageContent,
  deletePageContent
} from "../controllers/pageContent.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-page-content", createPageContent);
router.get("/get-all-page-contents", getAllPageContents);
router.get("/get-page-content-by-slug/:slug", getPageContentBySlug);
router.put("/update-page-content/:id", updatePageContent);
router.delete("/delete-page-content/:id", deletePageContent);

export default router;
