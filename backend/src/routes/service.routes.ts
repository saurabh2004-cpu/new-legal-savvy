import { Router } from "express";
import {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  getServiceBySlug,
} from "../controllers/service.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";

const router = Router();

router.post("/create-service", protectAdmin, uploadSingleImage("image"), createService);
router.get("/get-all-services", getAllServices);
router.get("/get-service-by-id/:id", getSingleService);
router.get("/get-service-by-slug/:slug", getServiceBySlug);
router.put("/update-service/:id", protectAdmin, uploadSingleImage("image"), updateService);
router.delete("/delete-service/:id", protectAdmin, deleteService);

export default router;
