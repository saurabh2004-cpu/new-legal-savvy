import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
} from "../controllers/blog.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/create-blog", protectAdmin, uploadSingleImage("image"), createBlog);
router.get("/get-all-blogs", getAllBlogs);
router.get("/get-blog-by-id/:id", getSingleBlog);
router.get("/get-blog-by-slug/:slug", getBlogBySlug);
router.put("/update-blog/:id", protectAdmin, uploadSingleImage("image"), updateBlog);
router.delete("/delete-blog/:id", protectAdmin, deleteBlog);

export default router;
