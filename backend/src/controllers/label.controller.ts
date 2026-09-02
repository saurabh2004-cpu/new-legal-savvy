import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Label } from "../models/label.model.js";
import { validateImage } from "../utils/image.util.js";
import { uploadImage, deleteImage } from "../services/image.service.js";
import * as xlsx from "xlsx";
import path from "path";
import fs from "fs";
import { generateUniqueSlug } from "../services/slug.service.js";

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
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Please provide both label type (city, state, bank) and name",
      });
      return;
    }

    if (!["city", "state", "bank"].includes(type)) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Invalid label type. Must be 'city', 'state', or 'bank'",
      });
      return;
    }

    // Validate image if provided
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

    // Check existing
    const existingLabel = await Label.findOne({ type, name });
    if (existingLabel) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Label already exists",
      });
      return;
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadImage(req.file, "label");
    }

    const slug = await generateUniqueSlug(name, Label);

    let label;
    try {
      label = await Label.create({
        type: type as "city" | "state" | "bank",
        name,
        slug,
        image: imageUrl || "",
        isFeatured: isFeatured === 'true' || isFeatured === true,
      });
    } catch (dbError) {
      if (req.file && imageUrl) {
        await deleteImage(imageUrl);
      }
      throw dbError;
    }

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
    const { type, name, isFeatured, removeImage } = req.body;

    if (!id || !isValidObjectId(id.toString())) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Invalid Label ID",
      });
      return;
    }

    if (type && !["city", "state", "bank"].includes(type)) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Invalid label type. Must be 'city', 'state', or 'bank'",
      });
      return;
    }

    const label = await Label.findById(id);

    if (!label) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(404).json({
        success: false,
        message: "Label not found",
      });
      return;
    }

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

    let imageUrl = label.image;
    let newImageUploaded = false;

    if (req.file) {
      imageUrl = await uploadImage(req.file, "label");
      newImageUploaded = true;
    } else if (removeImage === 'true' || removeImage === true) {
      imageUrl = undefined;
    }

    const oldImage = label.image;
    let updatedLabel;
    
    let updatedSlug = label.slug;
    if (name !== undefined && name !== label.name) {
      updatedSlug = await generateUniqueSlug(name, Label);
    }

    try {
      updatedLabel = await Label.findByIdAndUpdate(
        id,
        {
          type: type !== undefined ? (type as "city" | "state" | "bank") : label.type,
          name: name !== undefined ? name : label.name,
          slug: updatedSlug,
          image: imageUrl || undefined,
          isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : label.isFeatured,
        },
        { new: true, runValidators: true }
      );
    } catch (dbError) {
      if (newImageUploaded && imageUrl) {
        await deleteImage(imageUrl);
      }
      throw dbError;
    }

    if ((newImageUploaded || removeImage === 'true' || removeImage === true) && oldImage && oldImage !== imageUrl) {
      await deleteImage(oldImage);
    }

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

    if (label.image) {
      await deleteImage(label.image);
    }

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

    if (label.length === 0) {
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

export const importLabels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Excel file is required",
      });
      return;
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      res.status(400).json({
        success: false,
        message: "Excel file has no sheets",
      });
      return;
    }

    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      res.status(400).json({
        success: false,
        message: "Sheet not found in Excel file",
      });
      return;
    }

    // Convert to JSON and handle varying column cases
    const rawData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    if (!rawData || rawData.length === 0) {
      res.status(400).json({
        success: false,
        message: "Excel file is empty",
      });
      return;
    }

    let totalRows = 0;
    let importedRows = 0;
    let skippedRows = 0;
    const skippedItems: any[] = [];

    const existingLabelsCache = new Set();
    const existingDbLabels = await Label.find({}, { type: 1, name: 1 });
    existingDbLabels.forEach(l => existingLabelsCache.add(`${l.type}-${l.name.toLowerCase()}`));

    const validLabelsToInsert: any[] = [];

    for (let i = 0; i < rawData.length; i++) {
      const row: any = rawData[i];
      totalRows++;

      // Normalize headers
      let type = "";
      let name = "";
      let isFeaturedRaw: string | undefined;

      Object.keys(row).forEach(key => {
        const lowerKey = key.trim().toLowerCase();
        const value = row[key];
        
        if (lowerKey === "type") type = String(value).trim().toLowerCase();
        else if (lowerKey === "name") name = String(value).trim();
        else if (lowerKey === "is featured" || lowerKey === "isfeatured") {
          isFeaturedRaw = String(value).trim().toLowerCase();
        }
      });

      if (!type || !["city", "state", "bank"].includes(type)) {
        skippedRows++;
        skippedItems.push({
          "Row Number": i + 2, // Excel rows are 1-indexed and have a header
          "Type": type,
          "Name": name,
          "Is Featured": isFeaturedRaw,
          "Reason": "Invalid type. Allowed values are city, state, bank."
        });
        continue;
      }

      if (!name) {
        skippedRows++;
        skippedItems.push({
          "Row Number": i + 2,
          "Type": type,
          "Name": name,
          "Is Featured": isFeaturedRaw,
          "Reason": "Label name is required."
        });
        continue;
      }

      // Check isFeatured validity
      let isFeatured = false;
      if (isFeaturedRaw) {
        if (["true", "yes", "1"].includes(isFeaturedRaw)) {
          isFeatured = true;
        } else if (["false", "no", "0"].includes(isFeaturedRaw)) {
          isFeatured = false;
        } else {
          skippedRows++;
          skippedItems.push({
            "Row Number": i + 2,
            "Type": type,
            "Name": name,
            "Is Featured": isFeaturedRaw,
            "Reason": "Invalid isFeatured value. Allowed values are true, false, yes, no, 1, or 0."
          });
          continue;
        }
      }

      // Check duplicates
      const cacheKey = `${type}-${name.toLowerCase()}`;
      if (existingLabelsCache.has(cacheKey)) {
        skippedRows++;
        skippedItems.push({
          "Row Number": i + 2,
          "Type": type,
          "Name": name,
          "Is Featured": isFeaturedRaw,
          "Reason": "Label already exists."
        });
        continue;
      }
      
      const slug = await generateUniqueSlug(name, Label);

      // Add to valid insert list
      validLabelsToInsert.push({
        type: type as "city" | "state" | "bank",
        name,
        slug,
        isFeatured
      });
      existingLabelsCache.add(cacheKey);
      importedRows++;
    }

    if (validLabelsToInsert.length > 0) {
      await Label.insertMany(validLabelsToInsert);
    }

    let skippedFileUrl = null;
    if (skippedRows > 0) {
      const skippedSheet = xlsx.utils.json_to_sheet(skippedItems);
      const skippedWorkbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(skippedWorkbook, skippedSheet, "Skipped Records");

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `label-import-skipped-${Date.now()}.xlsx`;
      const filePath = path.join(uploadDir, fileName);

      xlsx.writeFile(skippedWorkbook, filePath);
      skippedFileUrl = `/uploads/${fileName}`;
    }

    res.status(200).json({
      success: true,
      message: "Import processing completed",
      data: {
        totalRows,
        importedRows,
        skippedRows,
        skippedItems,
        skippedFileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};