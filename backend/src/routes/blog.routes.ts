import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/create-blog", protectAdmin, upload.single("image"), createBlog);
router.get("/get-all-blogs", getAllBlogs);
router.get("/get-blog-by-id/:id", getSingleBlog);
router.put("/update-blog/:id", protectAdmin, upload.single("image"), updateBlog);
router.delete("/delete-blog/:id", protectAdmin, deleteBlog);

export default router;
