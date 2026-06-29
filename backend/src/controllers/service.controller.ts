import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Service } from "../models/service.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      title,
      description,
      relatedServices,
      clientsAssisted,
      highlight,
      startingFrom,
      fullDescription,
      shortDescriptionPoints,
    } = req.body;

    if (!name || !title || !description) {
      res.status(400).json({
        success: false,
        message: "Please provide name, title, and description",
      });
      return;
    }

    // Validate relatedServices if provided and has items
    if (relatedServices && Array.isArray(relatedServices) && relatedServices.length > 0) {
      for (const serviceId of relatedServices) {
        if (!isValidObjectId(serviceId)) {
          res.status(400).json({
            success: false,
            message: `Invalid ObjectId in relatedServices: ${serviceId}`,
          });
          return;
        }
      }
    }

    const service = await Service.create({
      name,
      title,
      description,
      relatedServices: (relatedServices && Array.isArray(relatedServices)) ? relatedServices : [],
      clientsAssisted,
      highlight,
      startingFrom,
      fullDescription,
      shortDescriptionPoints: (shortDescriptionPoints && Array.isArray(shortDescriptionPoints)) ? shortDescriptionPoints : [],
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const services = await Service.find({})
      .populate({
        path: "relatedServices",
        select: "_id name title",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Service ID",
      });
      return;
    }

    const service = await Service.findById(id).populate({
      path: "relatedServices",
      select: "_id name title",
    });

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Service retrieved successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      title,
      description,
      relatedServices,
      clientsAssisted,
      highlight,
      startingFrom,
      fullDescription,
      shortDescriptionPoints,
    } = req.body;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Service ID",
      });
      return;
    }

    // Validate relatedServices if provided and has items
    if (relatedServices && Array.isArray(relatedServices) && relatedServices.length > 0) {
      for (const serviceId of relatedServices) {
        if (!isValidObjectId(serviceId)) {
          res.status(400).json({
            success: false,
            message: `Invalid ObjectId in relatedServices: ${serviceId}`,
          });
          return;
        }
      }
    }

    const service = await Service.findById(id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name: name !== undefined ? name : service.name,
        title: title !== undefined ? title : service.title,
        description: description !== undefined ? description : service.description,
        relatedServices: relatedServices !== undefined ? relatedServices : service.relatedServices,
        clientsAssisted: clientsAssisted !== undefined ? clientsAssisted : service.clientsAssisted,
        highlight: highlight !== undefined ? highlight : service.highlight,
        startingFrom: startingFrom !== undefined ? startingFrom : service.startingFrom,
        fullDescription: fullDescription !== undefined ? fullDescription : service.fullDescription,
        shortDescriptionPoints: shortDescriptionPoints !== undefined ? shortDescriptionPoints : service.shortDescriptionPoints,
      },
      { new: true, runValidators: true }
    ).populate({
      path: "relatedServices",
      select: "_id name title",
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Service ID",
      });
      return;
    }

    const service = await Service.findById(id);

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
