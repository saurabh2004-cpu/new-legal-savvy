import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Address } from "../models/address.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { addressLine1, city, state, country, pincode, workingDays } = req.body;

    if (!addressLine1 || !city || !state || !country || !pincode) {
      res.status(400).json({
        success: false,
        message: "Please provide addressLine1, city, state, country, and pincode",
      });
      return;
    }

    const address = await Address.create({
      addressLine1,
      city,
      state,
      country,
      pincode,
      workingDays,
    });

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const addresses = await Address.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Addresses retrieved successfully",
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Address ID",
      });
      return;
    }

    const address = await Address.findById(id);

    if (!address) {
      res.status(404).json({
        success: false,
        message: "Address not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Address retrieved successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { addressLine1, city, state, country, pincode, workingDays } = req.body;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Address ID",
      });
      return;
    }

    const address = await Address.findById(id);

    if (!address) {
      res.status(404).json({
        success: false,
        message: "Address not found",
      });
      return;
    }

    // Merge/update parameters
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      {
        addressLine1: addressLine1 !== undefined ? addressLine1 : address.addressLine1,
        city: city !== undefined ? city : address.city,
        state: state !== undefined ? state : address.state,
        country: country !== undefined ? country : address.country,
        pincode: pincode !== undefined ? pincode : address.pincode,
        workingDays: workingDays !== undefined ? workingDays : address.workingDays,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Address ID",
      });
      return;
    }

    const address = await Address.findById(id);

    if (!address) {
      res.status(404).json({
        success: false,
        message: "Address not found",
      });
      return;
    }

    await Address.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
