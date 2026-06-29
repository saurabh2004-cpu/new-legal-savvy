import { Router } from "express";
import {
  createConsultation,
  getAllConsultations,
  getSingleConsultation,
  updateConsultation,
  deleteConsultation,
} from "../controllers/consultation.controller.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-consultation", createConsultation);
router.get("/get-all-consultations", protectAdmin, getAllConsultations);
router.get("/get-consultation-by-id/:id", protectAdmin, getSingleConsultation);
router.put("/update-consultation/:id", protectAdmin, updateConsultation);
router.delete("/delete-consultation/:id", protectAdmin, deleteConsultation);

export default router;
