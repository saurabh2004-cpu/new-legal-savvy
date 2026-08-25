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
      homePageDescription,
      sequence,
      metaTitle,
      metaDescription,
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

    // Sequence logic
    const lastService = await Service.findOne({})
      .sort({ sequence: -1 })
      .select("sequence");

    const maxSequence = lastService?.sequence || 0;

    let newSequence = Number(sequence);

    // If sequence is not provided, put it at the end
    if (!Number.isInteger(newSequence) || newSequence < 1) {
      newSequence = maxSequence + 1;
    }

    // Don't allow gaps
    if (newSequence > maxSequence + 1) {
      newSequence = maxSequence + 1;
    }

    // Shift existing services if inserting in the middle
    if (newSequence <= maxSequence) {
      // First move affected services to temporary values
      await Service.updateMany(
        {
          sequence: { $gte: newSequence },
        },
        {
          $inc: { sequence: maxSequence + 1 },
        }
      );

      // Now move them back into their correct positions
      await Service.updateMany(
        {
          sequence: {
            $gte: newSequence + maxSequence + 1,
          },
        },
        {
          $inc: { sequence: newSequence - (maxSequence + 1) + 1 },
        }
      );
    }

    let service;
    try {
      service = await Service.create({
        name,
        title,
        slug,
        image: imageUrl,

        homePageDescription,
        sequence: newSequence,
        metaTitle,
        metaDescription,

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
    console.log("Create service error:", error);
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
        select: "_id name title slug",
      })
      // .sort({ createdAt: -1 });
      .sort({ sequence: 1 });

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

// export const updateService = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       title,
//       description,
//       relatedServices,
//       clientsAssisted,
//       highlight,
//       startingFrom,
//       fullDescription,
//       shortDescriptionPoints,
//     } = req.body;

//     if (!id || !isValidObjectId(id.toString())) {
//       if (req.file) {
//         await deleteImage(`/public/uploads/${req.file.filename}`);
//       }
//       res.status(400).json({
//         success: false,
//         message: "Invalid Service ID",
//       });
//       return;
//     }

//     const service = await Service.findById(id);

//     if (!service) {
//       if (req.file) {
//         await deleteImage(`/public/uploads/${req.file.filename}`);
//       }
//       res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//       return;
//     }

//     // Parse arrays if received as JSON strings
//     let parsedRelatedServices: string[] | undefined = undefined;
//     if (relatedServices !== undefined) {
//       if (Array.isArray(relatedServices)) {
//         parsedRelatedServices = relatedServices;
//       } else {
//         try {
//           const raw = JSON.parse(relatedServices);
//           if (Array.isArray(raw)) {
//             parsedRelatedServices = raw;
//           }
//         } catch (e) {
//           console.error("Error parsing relatedServices:", e);
//         }
//       }
//     }

//     let parsedShortDescPoints: string[] | undefined = undefined;
//     if (shortDescriptionPoints !== undefined) {
//       if (Array.isArray(shortDescriptionPoints)) {
//         parsedShortDescPoints = shortDescriptionPoints;
//       } else {
//         try {
//           const raw = JSON.parse(shortDescriptionPoints);
//           if (Array.isArray(raw)) {
//             parsedShortDescPoints = raw;
//           }
//         } catch (e) {
//           console.error("Error parsing shortDescriptionPoints:", e);
//         }
//       }
//     }

//     // Validate relatedServices if provided and has items
//     if (parsedRelatedServices && parsedRelatedServices.length > 0) {
//       for (const serviceId of parsedRelatedServices) {
//         if (!isValidObjectId(serviceId)) {
//           if (req.file) {
//             await deleteImage(`/public/uploads/${req.file.filename}`);
//           }
//           res.status(400).json({
//             success: false,
//             message: `Invalid ObjectId in relatedServices: ${serviceId}`,
//           });
//           return;
//         }
//       }
//     }

//     // Validate new image if uploaded
//     if (req.file) {
//       const imgValError = validateImage(req.file, false);
//       if (imgValError) {
//         await deleteImage(`/public/uploads/${req.file.filename}`);
//         res.status(400).json({
//           success: false,
//           message: imgValError,
//         });
//         return;
//       }
//     }

//     let imageUrl = service.image;
//     let newImageUploaded = false;

//     if (req.file) {
//       imageUrl = await uploadImage(req.file, "service");
//       newImageUploaded = true;
//     } else if (req.body.image !== undefined) {
//       if (req.body.image) {
//         imageUrl = req.body.image;
//       }
//     }

//     // Generate slug only if title changes
//     let slug = service.slug;
//     if (title !== undefined && title !== service.title) {
//       slug = await generateUniqueSlug(title, Service, id as string);
//     }

//     const oldImage = service.image;
//     let updatedService;

//     try {
//       updatedService = await Service.findByIdAndUpdate(
//         id,
//         {
//           name: name !== undefined ? name : service.name,
//           title: title !== undefined ? title : service.title,
//           slug,
//           image: imageUrl,
//           description: description !== undefined ? description : service.description,
//           relatedServices: parsedRelatedServices !== undefined ? parsedRelatedServices : service.relatedServices,
//           clientsAssisted: clientsAssisted !== undefined ? clientsAssisted : service.clientsAssisted,
//           highlight: highlight !== undefined ? highlight : service.highlight,
//           startingFrom: startingFrom !== undefined ? startingFrom : service.startingFrom,
//           fullDescription: fullDescription !== undefined ? fullDescription : service.fullDescription,
//           shortDescriptionPoints: parsedShortDescPoints !== undefined ? parsedShortDescPoints : service.shortDescriptionPoints,
//         },
//         { new: true, runValidators: true }
//       ).populate({
//         path: "relatedServices",
//         select: "_id name title",
//       });
//     } catch (dbError) {
//       // Clean up newly uploaded image if database update fails
//       if (newImageUploaded) {
//         await deleteImage(imageUrl);
//       }
//       throw dbError;
//     }

//     // Safely delete old image after database update succeeds
//     if (newImageUploaded && oldImage && oldImage !== imageUrl) {
//       await deleteImage(oldImage);
//     }

//     res.status(200).json({
//       success: true,
//       message: "Service updated successfully",
//       data: updatedService,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

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
      homePageDescription,
      sequence,
      metaTitle,
      metaDescription,
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

    // =========================================================
    // SEQUENCE LOGIC
    // =========================================================

    let newSequence = service.sequence;

    // Sequence is optional during update.
    // If not provided, keep the existing sequence.
    if (sequence !== undefined && sequence !== "") {
      newSequence = Number(sequence);

      // Validate sequence
      if (!Number.isInteger(newSequence) || newSequence < 1) {
        if (req.file) {
          await deleteImage(`/public/uploads/${req.file.filename}`);
        }

        res.status(400).json({
          success: false,
          message: "Sequence must be a positive integer",
        });

        return;
      }

      // Get highest sequence excluding current service
      const lastService = await Service.findOne({
        _id: { $ne: id },
      })
        .sort({ sequence: -1 })
        .select("sequence");

      const maxSequence = lastService?.sequence || 0;

      // Prevent gaps
      if (newSequence > maxSequence + 1) {
        newSequence = maxSequence + 1;
      }

      // Only reorder if sequence actually changed
      if (newSequence !== service.sequence) {

        const oldSequence = service.sequence;

        // Get a safe temporary sequence.
        // maxSequence + 1 may already be the requested position,
        // so use a value safely outside the normal range.
        const temporarySequence = maxSequence + 1000;

        // Move current service to temporary position
        await Service.findByIdAndUpdate(id, {
          sequence: temporarySequence,
        });

        if (newSequence < oldSequence) {
          // Moving service UP in the list

          const affectedServices = await Service.find({
            _id: { $ne: id },
            sequence: {
              $gte: newSequence,
              $lt: oldSequence,
            },
          }).select("_id sequence");

          // First move affected services to temporary positions
          // to avoid unique index conflicts.
          for (const affected of affectedServices) {
            await Service.findByIdAndUpdate(affected._id, {
              sequence: affected.sequence + 1000,
            });
          }

          // Now assign their final sequences
          for (const affected of affectedServices) {
            await Service.findByIdAndUpdate(affected._id, {
              sequence: affected.sequence + 1,
            });
          }
        } else {
          // Moving service DOWN in the list
          const affectedServices = await Service.find({
            _id: { $ne: id },
            sequence: {
              $gt: oldSequence,
              $lte: newSequence,
            },
          }).select("_id sequence");

          // First move affected services to temporary positions
          for (const affected of affectedServices) {
            await Service.findByIdAndUpdate(affected._id, {
              sequence: affected.sequence + 1000,
            });
          }

          // Now assign their final sequences
          for (const affected of affectedServices) {
            await Service.findByIdAndUpdate(affected._id, {
              sequence: affected.sequence - 1,
            });
          }
        }
      }
    }

    // =========================================================
    // Parse relatedServices
    // =========================================================

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

    // =========================================================
    // Parse shortDescriptionPoints
    // =========================================================

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

    // Validate relatedServices
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

    // =========================================================
    // Validate new image
    // =========================================================

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

    // =========================================================
    // Generate slug only if title changes
    // =========================================================

    let slug = service.slug;

    if (title !== undefined && title !== service.title) {
      slug = await generateUniqueSlug(
        title,
        Service,
        id as string
      );
    }

    const oldImage = service.image;

    let updatedService;

    try {
      updatedService = await Service.findByIdAndUpdate(
        id,
        {
          name:
            name !== undefined
              ? name
              : service.name,

          title:
            title !== undefined
              ? title
              : service.title,

          slug,

          image: imageUrl,

          // NEW
          homePageDescription:
            homePageDescription !== undefined
              ? homePageDescription
              : service.homePageDescription,

          sequence: newSequence,

          metaTitle:
            metaTitle !== undefined
              ? metaTitle
              : service.metaTitle,

          metaDescription:
            metaDescription !== undefined
              ? metaDescription
              : service.metaDescription,

          description:
            description !== undefined
              ? description
              : service.description,

          relatedServices:
            parsedRelatedServices !== undefined
              ? parsedRelatedServices
              : service.relatedServices,

          clientsAssisted:
            clientsAssisted !== undefined
              ? clientsAssisted
              : service.clientsAssisted,

          highlight:
            highlight !== undefined
              ? highlight
              : service.highlight,

          startingFrom:
            startingFrom !== undefined
              ? startingFrom
              : service.startingFrom,

          fullDescription:
            fullDescription !== undefined
              ? fullDescription
              : service.fullDescription,

          shortDescriptionPoints:
            parsedShortDescPoints !== undefined
              ? parsedShortDescPoints
              : service.shortDescriptionPoints,
        },
        {
          new: true,
          runValidators: true,
        }
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
    if (
      newImageUploaded &&
      oldImage &&
      oldImage !== imageUrl
    ) {
      await deleteImage(oldImage);
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.log("Updated service error:", error);
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

    const deletedSequence = service.sequence;

    await Service.findByIdAndDelete(id);

    if (deletedSequence) {
      await Service.updateMany(
        {
          sequence: { $gt: deletedSequence },
        },
        {
          $inc: { sequence: -1 },
        }
      );
    }

    // Clean up associated image on disk after deletion
    if (service.image) {
      await deleteImage(service.image);
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.log("Delete service error:", error);
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
