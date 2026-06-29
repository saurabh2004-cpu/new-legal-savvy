import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Label } from "../models/label.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createLabel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type, name, isFeatured } = req.body;

    if (!type || !name) {
      res.status(400).json({
        success: false,
        message: "Please provide both label type (city, state, bank) and name",
      });
      return;
    }

    if (!["city", "state", "bank"].includes(type)) {
      res.status(400).json({
        success: false,
        message: "Invalid label type. Must be 'city', 'state', or 'bank'",
      });
      return;
    }

    const label = await Label.create({
      type,
      name,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
    });

    res.status(201).json({
      success: true,
      message: "Label created successfully",
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLabels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type, isFeatured } = req.query;
    const filter: any = {};

    if (type && typeof type === "string") {
      filter.type = type;
    }
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true";
    }

    const labels = await Label.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Labels retrieved successfully",
      data: labels,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleLabel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Label ID",
      });
      return;
    }

    const label = await Label.findById(id);

    if (!label) {
      res.status(404).json({
        success: false,
        message: "Label not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Label retrieved successfully",
      data: label,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLabel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, name, isFeatured } = req.body;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Label ID",
      });
      return;
    }

    if (type && !["city", "state", "bank"].includes(type)) {
      res.status(400).json({
        success: false,
        message: "Invalid label type. Must be 'city', 'state', or 'bank'",
      });
      return;
    }

    const label = await Label.findById(id);

    if (!label) {
      res.status(404).json({
        success: false,
        message: "Label not found",
      });
      return;
    }

    const updatedLabel = await Label.findByIdAndUpdate(
      id,
      {
        type: type !== undefined ? type : label.type,
        name: name !== undefined ? name : label.name,
        isFeatured: isFeatured !== undefined ? isFeatured : label.isFeatured,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Label updated successfully",
      data: updatedLabel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLabel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Label ID",
      });
      return;
    }

    const label = await Label.findById(id);

    if (!label) {
      res.status(404).json({
        success: false,
        message: "Label not found",
      });
      return;
    }

    await Label.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Label deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getLabelByType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type } = req.params;

    if (!type) {
      res.status(400).json({
        success: false,
        message: "Please provide label type",
      });
      return;
    }

    if (!["city", "state", "bank"].includes(type.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid label type. Must be 'city', 'state', or 'bank'",
      });
      return;
    }

    const labelType = type.toString() as "city" | "state" | "bank";
    const label = await Label.find({ type: labelType });

    if (!label) { 
      res.status(404).json({
        success: false,
        message: "Label not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Label retrieved successfully",
      data: label,
    });
  } catch (error) {
    next(error);
  }
};