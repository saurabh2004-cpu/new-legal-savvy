import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Service } from "../models/service.model.js";
import { validateImage } from "../utils/image.util.js";
import { uploadImage, deleteImage } from "../services/image.service.js";
import { generateUniqueSlug } from "../services/slug.service.js";

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

    // Validate image first
    if (req.file) {
      const imgValError = validateImage(req.file, true);
      if (imgValError) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
        res.status(400).json({
          success: false,
          message: imgValError,
        });
        return;
      }
    } else if (!req.body.image) {
      res.status(400).json({
        success: false,
        message: "Image file is required",
      });
      return;
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadImage(req.file, "service");
    } else {
      imageUrl = req.body.image;
    }

    if (!name || !title || !description || !imageUrl) {
      if (req.file) {
        await deleteImage(imageUrl);
      }
      res.status(400).json({
        success: false,
        message: "Please provide name, title, description, and image",
      });
      return;
    }

    // Parse arrays that might be received as JSON strings in multipart requests
    let parsedRelatedServices: string[] = [];
    if (relatedServices) {
      if (Array.isArray(relatedServices)) {
        parsedRelatedServices = relatedServices;
      } else {
        try {
          const raw = JSON.parse(relatedServices);
          if (Array.isArray(raw)) {
            parsedRelatedServices = raw;
          }
        } catch (e) {
          console.error("Error parsing relatedServices:", e);
        }
      }
    }

    let parsedShortDescPoints: string[] = [];
    if (shortDescriptionPoints) {
      if (Array.isArray(shortDescriptionPoints)) {
        parsedShortDescPoints = shortDescriptionPoints;
      } else {
        try {
          const raw = JSON.parse(shortDescriptionPoints);
          if (Array.isArray(raw)) {
            parsedShortDescPoints = raw;
          }
        } catch (e) {
          console.error("Error parsing shortDescriptionPoints:", e);
        }
      }
    }

    // Validate relatedServices if provided and has items
    if (parsedRelatedServices.length > 0) {
      for (const serviceId of parsedRelatedServices) {
        if (!isValidObjectId(serviceId)) {
          if (req.file) {
            await deleteImage(imageUrl);
          }
          res.status(400).json({
            success: false,
            message: `Invalid ObjectId in relatedServices: ${serviceId}`,
          });
          return;
        }
      }
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(title, Service);

    let service;
    try {
      service = await Service.create({
        name,
        title,
        slug,
        image: imageUrl,
        description,
        relatedServices: parsedRelatedServices,
        clientsAssisted,
        highlight,
        startingFrom,
        fullDescription,
        shortDescriptionPoints: parsedShortDescPoints,
      });
    } catch (dbError) {
      // Clean up newly uploaded image if database save fails
      if (req.file) {
        await deleteImage(imageUrl);
      }
      throw dbError;
    }

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
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Invalid Service ID",
      });
      return;
    }

    const service = await Service.findById(id);

    if (!service) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(404).json({
        success: false,
        message: "Service not found",
      });
      return;
    }

    // Parse arrays if received as JSON strings
    let parsedRelatedServices: string[] | undefined = undefined;
    if (relatedServices !== undefined) {
      if (Array.isArray(relatedServices)) {
        parsedRelatedServices = relatedServices;
      } else {
        try {
          const raw = JSON.parse(relatedServices);
          if (Array.isArray(raw)) {
            parsedRelatedServices = raw;
          }
        } catch (e) {
          console.error("Error parsing relatedServices:", e);
        }
      }
    }

    let parsedShortDescPoints: string[] | undefined = undefined;
    if (shortDescriptionPoints !== undefined) {
      if (Array.isArray(shortDescriptionPoints)) {
        parsedShortDescPoints = shortDescriptionPoints;
      } else {
        try {
          const raw = JSON.parse(shortDescriptionPoints);
          if (Array.isArray(raw)) {
            parsedShortDescPoints = raw;
          }
        } catch (e) {
          console.error("Error parsing shortDescriptionPoints:", e);
        }
      }
    }

    // Validate relatedServices if provided and has items
    if (parsedRelatedServices && parsedRelatedServices.length > 0) {
      for (const serviceId of parsedRelatedServices) {
        if (!isValidObjectId(serviceId)) {
          if (req.file) {
            await deleteImage(`/public/uploads/${req.file.filename}`);
          }
          res.status(400).json({
            success: false,
            message: `Invalid ObjectId in relatedServices: ${serviceId}`,
          });
          return;
        }
      }
    }

    // Validate new image if uploaded
    if (req.file) {
      const imgValError = validateImage(req.file, false);
      if (imgValError) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
        res.status(400).json({
          success: false,
          message: imgValError,
        });
        return;
      }
    }

    let imageUrl = service.image;
    let newImageUploaded = false;

    if (req.file) {
      imageUrl = await uploadImage(req.file, "service");
      newImageUploaded = true;
    } else if (req.body.image !== undefined) {
      if (req.body.image) {
        imageUrl = req.body.image;
      }
    }

    // Generate slug only if title changes
    let slug = service.slug;
    if (title !== undefined && title !== service.title) {
      slug = await generateUniqueSlug(title, Service, id as string);
    }

    const oldImage = service.image;
    let updatedService;

    try {
      updatedService = await Service.findByIdAndUpdate(
        id,
        {
          name: name !== undefined ? name : service.name,
          title: title !== undefined ? title : service.title,
          slug,
          image: imageUrl,
          description: description !== undefined ? description : service.description,
          relatedServices: parsedRelatedServices !== undefined ? parsedRelatedServices : service.relatedServices,
          clientsAssisted: clientsAssisted !== undefined ? clientsAssisted : service.clientsAssisted,
          highlight: highlight !== undefined ? highlight : service.highlight,
          startingFrom: startingFrom !== undefined ? startingFrom : service.startingFrom,
          fullDescription: fullDescription !== undefined ? fullDescription : service.fullDescription,
          shortDescriptionPoints: parsedShortDescPoints !== undefined ? parsedShortDescPoints : service.shortDescriptionPoints,
        },
        { new: true, runValidators: true }
      ).populate({
        path: "relatedServices",
        select: "_id name title",
      });
    } catch (dbError) {
      // Clean up newly uploaded image if database update fails
      if (newImageUploaded) {
        await deleteImage(imageUrl);
      }
      throw dbError;
    }

    // Safely delete old image after database update succeeds
    if (newImageUploaded && oldImage && oldImage !== imageUrl) {
      await deleteImage(oldImage);
    }

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

    // Clean up associated image on disk after deletion
    if (service.image) {
      await deleteImage(service.image);
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({
        success: false,
        message: "Slug parameter is required",
      });
      return;
    }

    const service = await Service.findOne({ slug }).populate({
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
