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
      homePage,
      showOnHomePage,
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
      faqs,
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const imageFile = files?.['image']?.[0];
    const homePageImageFile = files?.['homePageImage']?.[0];

    const cleanupUploadedFiles = async () => {
      if (imageFile && imageFile.filename) {
        await deleteImage(`/public/uploads/${imageFile.filename}`);
      }
      if (homePageImageFile && homePageImageFile.filename) {
        await deleteImage(`/public/uploads/${homePageImageFile.filename}`);
      }
    };

    // Validate image first
    if (!imageFile && !req.body.image) {
      res.status(400).json({
        success: false,
        message: "Image file is required",
      });
      return;
    }

    if (imageFile) {
      const imgValError = validateImage(imageFile, true);
      if (imgValError) {
        await cleanupUploadedFiles();
        res.status(400).json({
          success: false,
          message: imgValError,
        });
        return;
      }
    }

    if (homePageImageFile) {
      const imgValError = validateImage(homePageImageFile, false);
      if (imgValError) {
        await cleanupUploadedFiles();
        res.status(400).json({
          success: false,
          message: `Home Page Image Error: ${imgValError}`,
        });
        return;
      }
    }

    let imageUrl = "";
    let homePageImageUrl = "";

    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "service");
      } else if (req.body.image) {
        imageUrl = req.body.image;
      }

      if (homePageImageFile) {
        homePageImageUrl = await uploadImage(homePageImageFile, "service");
      } else if (req.body.homePageImage) {
        homePageImageUrl = req.body.homePageImage;
      }
    } catch (uploadError) {
      await cleanupUploadedFiles();
      throw uploadError;
    }

    if (!name || !title || !description || !imageUrl) {
      if (imageFile) await deleteImage(imageUrl);
      if (homePageImageFile) await deleteImage(homePageImageUrl);
      res.status(400).json({
        success: false,
        message: "Please provide name, title, description, and image",
      });
      return;
    }

    // Parse homePage object
    let parsedHomePage: any = undefined;
    if (homePage) {
      if (typeof homePage === "object") {
        parsedHomePage = homePage;
      } else {
        try {
          parsedHomePage = JSON.parse(homePage);
        } catch (e) {
          console.error("Error parsing homePage:", e);
        }
      }
    }

    const isShowOnHomePage = showOnHomePage === "true" || showOnHomePage === true;

    if (isShowOnHomePage) {
      // Validate parsedHomePage
      if (!parsedHomePage) {
        if (imageFile) await deleteImage(imageUrl);
        if (homePageImageFile) await deleteImage(homePageImageUrl);
        res.status(400).json({
          success: false,
          message: "Please provide homePage configuration object when showOnHomePage is true",
        });
        return;
      }

      if (!parsedHomePage.tag || !parsedHomePage.title || !parsedHomePage.description) {
        if (imageFile) await deleteImage(imageUrl);
        if (homePageImageFile) await deleteImage(homePageImageUrl);
        res.status(400).json({
          success: false,
          message: "homePage object requires tag, title, and description when showOnHomePage is true",
        });
        return;
      }

      // Ensure stats array and its contents are properly formatted
      if (parsedHomePage.stats && !Array.isArray(parsedHomePage.stats)) {
        if (imageFile) await deleteImage(imageUrl);
        if (homePageImageFile) await deleteImage(homePageImageUrl);
        res.status(400).json({
          success: false,
          message: "homePage.stats must be an array",
        });
        return;
      }

      if (parsedHomePage.stats) {
        for (const stat of parsedHomePage.stats) {
          if (!stat.label || !stat.value) {
            if (imageFile) await deleteImage(imageUrl);
            if (homePageImageFile) await deleteImage(homePageImageUrl);
            res.status(400).json({
              success: false,
              message: "Each stat in homePage.stats requires a label and a value",
            });
            return;
          }
        }
      } else {
        parsedHomePage.stats = [];
      }
    } else {
      // If showOnHomePage is false: make homePage completely optional
      if (!parsedHomePage) {
        parsedHomePage = {
          tag: "",
          title: "",
          description: "",
          stats: [],
        };
      } else {
        if (!parsedHomePage.stats || !Array.isArray(parsedHomePage.stats)) {
          parsedHomePage.stats = [];
        }
      }
    }

    // Assign parsed image to homePage object
    if (homePageImageUrl) {
      parsedHomePage.image = homePageImageUrl;
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

    let parsedFaqs: { question: string; answer: string }[] = [];
    if (faqs) {
      if (Array.isArray(faqs)) {
        parsedFaqs = faqs;
      } else {
        try {
          const raw = JSON.parse(faqs);
          if (Array.isArray(raw)) {
            parsedFaqs = raw;
          }
        } catch (e) {
          console.error("Error parsing faqs:", e);
        }
      }
      parsedFaqs = parsedFaqs.filter(
        (f) => f && typeof f.question === "string" && typeof f.answer === "string" && f.question.trim() !== "" && f.answer.trim() !== ""
      );
    }

    // Validate relatedServices if provided and has items
    if (parsedRelatedServices.length > 0) {
      for (const serviceId of parsedRelatedServices) {
        if (!isValidObjectId(serviceId)) {
          if (imageFile) await deleteImage(imageUrl);
          if (homePageImageFile) await deleteImage(homePageImageUrl);
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

        homePage: parsedHomePage,
        showOnHomePage: showOnHomePage === "true" || showOnHomePage === true,
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
        faqs: parsedFaqs,
      });
    } catch (dbError) {
      // Clean up newly uploaded image if database save fails
      if (imageFile) await deleteImage(imageUrl);
      if (homePageImageFile) await deleteImage(homePageImageUrl);
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
    const filter: any = {};
    if (req.query.showOnHomePage !== undefined) {
      filter.showOnHomePage = req.query.showOnHomePage === "true";
    }

    const services = await Service.find(filter)
      .populate({
        path: "relatedServices",
        select: "_id name title slug",
      })
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
      homePage,
      showOnHomePage,
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
      faqs,
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const imageFile = files?.['image']?.[0];
    const homePageImageFile = files?.['homePageImage']?.[0];

    const cleanupUploadedFiles = async () => {
      if (imageFile && imageFile.filename) {
        await deleteImage(`/public/uploads/${imageFile.filename}`);
      }
      if (homePageImageFile && homePageImageFile.filename) {
        await deleteImage(`/public/uploads/${homePageImageFile.filename}`);
      }
    };

    if (!id || !isValidObjectId(id.toString())) {
      await cleanupUploadedFiles();
      res.status(400).json({
        success: false,
        message: "Invalid Service ID",
      });
      return;
    }

    const service = await Service.findById(id);

    if (!service) {
      await cleanupUploadedFiles();
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
        await cleanupUploadedFiles();
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

    // =========================================================
    // Parse faqs
    // =========================================================

    let parsedFaqs: { question: string; answer: string }[] | undefined = undefined;

    if (faqs !== undefined) {
      if (Array.isArray(faqs)) {
        parsedFaqs = faqs;
      } else {
        try {
          const raw = JSON.parse(faqs);
          if (Array.isArray(raw)) {
            parsedFaqs = raw;
          }
        } catch (e) {
          console.error("Error parsing faqs:", e);
        }
      }
      if (parsedFaqs) {
        parsedFaqs = parsedFaqs.filter(
          (f) => f && typeof f.question === "string" && typeof f.answer === "string" && f.question.trim() !== "" && f.answer.trim() !== ""
        );
      }
    }

    // Validate relatedServices
    if (parsedRelatedServices && parsedRelatedServices.length > 0) {
      for (const serviceId of parsedRelatedServices) {
        if (!isValidObjectId(serviceId)) {
          await cleanupUploadedFiles();
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

    if (imageFile) {
      const imgValError = validateImage(imageFile, false);
      if (imgValError) {
        await cleanupUploadedFiles();
        res.status(400).json({
          success: false,
          message: imgValError,
        });
        return;
      }
    }

    if (homePageImageFile) {
      const imgValError = validateImage(homePageImageFile, false);
      if (imgValError) {
        await cleanupUploadedFiles();
        res.status(400).json({
          success: false,
          message: `Home Page Image Error: ${imgValError}`,
        });
        return;
      }
    }

    let imageUrl = service.image;
    let homePageImageUrl = service.homePage?.image || "";
    let newImageUploaded = false;
    let newHomePageImageUploaded = false;

    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "service");
        newImageUploaded = true;
      } else if (req.body.image) {
        imageUrl = req.body.image;
      }

      if (homePageImageFile) {
        homePageImageUrl = await uploadImage(homePageImageFile, "service");
        newHomePageImageUploaded = true;
      } else if (req.body.homePageImage !== undefined) {
        homePageImageUrl = req.body.homePageImage || "";
      }
    } catch (uploadError) {
      await cleanupUploadedFiles();
      throw uploadError;
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

    // Parse homePage object
    let parsedHomePage: any = undefined;
    if (homePage !== undefined) {
      if (typeof homePage === "object") {
        parsedHomePage = homePage;
      } else {
        try {
          parsedHomePage = JSON.parse(homePage);
        } catch (e) {
          console.error("Error parsing homePage:", e);
        }
      }
    }

    const isShowOnHomePage = showOnHomePage !== undefined
      ? (showOnHomePage === "true" || showOnHomePage === true)
      : service.showOnHomePage;

    if (isShowOnHomePage) {
      const targetHomePage = parsedHomePage !== undefined ? parsedHomePage : service.homePage;

      if (!targetHomePage) {
        if (newImageUploaded) await deleteImage(imageUrl);
        if (newHomePageImageUploaded) await deleteImage(homePageImageUrl);
        res.status(400).json({
          success: false,
          message: "Please provide homePage configuration object when showOnHomePage is true",
        });
        return;
      }

      if (!targetHomePage.tag || !targetHomePage.title || !targetHomePage.description) {
        if (newImageUploaded) await deleteImage(imageUrl);
        if (newHomePageImageUploaded) await deleteImage(homePageImageUrl);
        res.status(400).json({
          success: false,
          message: "homePage object requires tag, title, and description when showOnHomePage is true",
        });
        return;
      }

      if (targetHomePage.stats && !Array.isArray(targetHomePage.stats)) {
        if (newImageUploaded) await deleteImage(imageUrl);
        if (newHomePageImageUploaded) await deleteImage(homePageImageUrl);
        res.status(400).json({
          success: false,
          message: "homePage.stats must be an array",
        });
        return;
      }

      if (targetHomePage.stats) {
        for (const stat of targetHomePage.stats) {
          if (!stat.label || !stat.value) {
            if (newImageUploaded) await deleteImage(imageUrl);
            if (newHomePageImageUploaded) await deleteImage(homePageImageUrl);
            res.status(400).json({
              success: false,
              message: "Each stat in homePage.stats requires a label and a value",
            });
            return;
          }
        }
      } else {
        if (parsedHomePage) {
          parsedHomePage.stats = [];
        }
      }
    } else {
      if (parsedHomePage) {
        if (!parsedHomePage.stats || !Array.isArray(parsedHomePage.stats)) {
          parsedHomePage.stats = [];
        }
      }
    }

    if (parsedHomePage !== undefined) {
      parsedHomePage.image = homePageImageUrl;
    } else if (newHomePageImageUploaded) {
      parsedHomePage = {
        ...(service.homePage ? ((service.homePage as any).toObject ? (service.homePage as any).toObject() : service.homePage) : {}),
        image: homePageImageUrl
      };
    }

    const oldImage = service.image;
    const oldHomePageImage = service.homePage?.image;

    let updatedService;

    try {
      updatedService = await Service.findByIdAndUpdate(
        id,
        {
          name: name !== undefined ? name : service.name,
          title: title !== undefined ? title : service.title,
          slug,
          image: imageUrl,
          sequence: newSequence,

          // homePage & showOnHomePage
          homePage: parsedHomePage !== undefined ? parsedHomePage : service.homePage,
          showOnHomePage: showOnHomePage !== undefined ? (showOnHomePage === "true" || showOnHomePage === true) : service.showOnHomePage,

          metaTitle: metaTitle !== undefined ? metaTitle : service.metaTitle,
          metaDescription: metaDescription !== undefined ? metaDescription : service.metaDescription,
          description: description !== undefined ? description : service.description,
          relatedServices: parsedRelatedServices !== undefined ? parsedRelatedServices : service.relatedServices,
          clientsAssisted: clientsAssisted !== undefined ? clientsAssisted : service.clientsAssisted,
          highlight: highlight !== undefined ? highlight : service.highlight,
          startingFrom: startingFrom !== undefined ? startingFrom : service.startingFrom,
          fullDescription: fullDescription !== undefined ? fullDescription : service.fullDescription,
          shortDescriptionPoints: parsedShortDescPoints !== undefined ? parsedShortDescPoints : service.shortDescriptionPoints,
          faqs: parsedFaqs !== undefined ? parsedFaqs : service.faqs,
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
      if (newImageUploaded) {
        await deleteImage(imageUrl);
      }
      if (newHomePageImageUploaded) {
        await deleteImage(homePageImageUrl);
      }
      throw dbError;
    }

    // Safely delete old image after database update succeeds
    if (newImageUploaded && oldImage && oldImage !== imageUrl) {
      await deleteImage(oldImage);
    }
    if (newHomePageImageUploaded && oldHomePageImage && oldHomePageImage !== homePageImageUrl) {
      await deleteImage(oldHomePageImage);
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
    if (service.homePage?.image) {
      await deleteImage(service.homePage.image);
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
