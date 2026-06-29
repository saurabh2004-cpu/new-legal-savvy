import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Consultation } from "../models/consultation.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      phone,
      alternatePhone,
      email,
      city,
      customCity,
      maritalStatus,
      spouseIncome,
      employmentStatus,
      monthlyIncome,
      totalCreditCardDues,
      totalLoanDues,
      convenientCallTime,
      paymentStatus,
      facingHarassment,
      receivedLegalNotice,
      settlementTime,
      pastSettlement,
      receivedSettlementLetter,
      fundsRequirement,
      preferredLanguage,
      message,
    } = req.body;

    // Check required fields (manually check for quick bad requests)
    const requiredFields = [
      "name",
      "phone",
      "alternatePhone",
      "email",
      "city",
      "maritalStatus",
      "employmentStatus",
      "monthlyIncome",
      "totalCreditCardDues",
      "totalLoanDues",
      "convenientCallTime"
    ];

    const missingFields = requiredFields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
    );

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    if (city === "Others" && !customCity) {
      res.status(400).json({ success: false, message: "Custom city is required when city is Others" });
      return;
    }

    if (maritalStatus === "Married" && !spouseIncome) {
      res.status(400).json({ success: false, message: "Spouse income is required for married applicants" });
      return;
    }

    const showLoanSection = totalLoanDues !== "No Dues" && totalLoanDues !== "";
    if (showLoanSection) {
      if (!paymentStatus || !facingHarassment || !pastSettlement || !fundsRequirement || !preferredLanguage) {
        res.status(400).json({ success: false, message: "Missing required loan details" });
        return;
      }
      
      if (facingHarassment === "Facing Severe Harassment" && !receivedLegalNotice) {
        res.status(400).json({ success: false, message: "Please specify if you received a legal notice" });
        return;
      }

      if (facingHarassment === "Facing Some Harassment (Getting Recovery Calls)" && !settlementTime) {
        res.status(400).json({ success: false, message: "Settlement time is required" });
        return;
      }
    }

    const showSettlementLetter = pastSettlement === "Yes" || (totalCreditCardDues !== "No Dues" && totalCreditCardDues !== "");
    if (showSettlementLetter && !receivedSettlementLetter) {
      res.status(400).json({ success: false, message: "Please specify if you received a settlement letter" });
      return;
    }

    const consultation = await Consultation.create({
      name,
      phone,
      alternatePhone: alternatePhone || "",
      email,
      city,
      customCity,
      maritalStatus,
      spouseIncome,
      employmentStatus,
      monthlyIncome,
      totalCreditCardDues,
      totalLoanDues,
      convenientCallTime,
      paymentStatus,
      facingHarassment,
      receivedLegalNotice,
      settlementTime,
      pastSettlement,
      receivedSettlementLetter,
      fundsRequirement,
      preferredLanguage,
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      data: consultation,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: "Validation Error",
        data: messages,
      });
      return;
    }
    next(error);
  }
};

export const getAllConsultations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const consultations = await Consultation.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Consultations retrieved successfully",
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Consultation ID",
      });
      return;
    }

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Consultation retrieved successfully",
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
};

export const updateConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Consultation ID",
      });
      return;
    }

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
      return;
    }

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Consultation updated successfully",
      data: updatedConsultation,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: "Validation Error",
        data: messages,
      });
      return;
    }
    next(error);
  }
};

export const deleteConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Consultation ID",
      });
      return;
    }

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
      return;
    }

    await Consultation.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
