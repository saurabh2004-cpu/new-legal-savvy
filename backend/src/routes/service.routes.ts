import { Router } from "express";
import {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-service", protectAdmin, createService);
router.get("/get-all-services", getAllServices);
router.get("/get-service-by-id/:id", getSingleService);
router.put("/update-service/:id", protectAdmin, updateService);
router.delete("/delete-service/:id", protectAdmin, deleteService);

export default router;
