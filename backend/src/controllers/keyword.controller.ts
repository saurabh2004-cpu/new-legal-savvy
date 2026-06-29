import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Keyword } from "../models/keyword.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const importKeywords = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload a CSV file",
      });
      return;
    }

    const fileContent = req.file.buffer.toString("utf-8");
    // Split by newlines
    const lines = fileContent.split(/\r?\n/);
    if (lines.length < 2) {
      res.status(400).json({
        success: false,
        message: "The uploaded CSV file is empty or missing data rows",
      });
      return;
    }

    // Skip the first row (heading 'keyword')
    const rawKeywords = lines.slice(1);

    // Parse keywords, remove quotes, trim, and filter empties
    const keywords = rawKeywords
      .map(line => {
        // Strip quotes and carriage return
        return line.replace(/^["']|["']$/g, '').replace(/\r/g, '').trim();
      })
      .filter(line => line.length > 0);

    if (keywords.length === 0) {
      res.status(400).json({
        success: false,
        message: "No valid keywords found in the CSV file",
      });
      return;
    }

    // Execute bulk write to upsert keywords and avoid duplicate key errors
    const ops = keywords.map(kw => ({
      updateOne: {
        filter: { keyword: kw },
        update: { $setOnInsert: { keyword: kw, status: "pending" as const } },
        upsert: true
      }
    }));

    const result = await Keyword.bulkWrite(ops);

    res.status(201).json({
      success: true,
      message: "CSV imported successfully",
      data: {
        totalRowsProcessed: keywords.length,
        insertedCount: result.upsertedCount,
        matchedCount: result.matchedCount,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllKeywords = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.query;
    const filter: any = {};

    if (status && typeof status === "string") {
      filter.status = status;
    }

    const keywords = await Keyword.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Keywords retrieved successfully",
      data: keywords,
    });
  } catch (error) {
    next(error);
  }
};

export const updateKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { keyword, status } = req.body;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Keyword ID",
      });
      return;
    }

    if (status && !["pending", "completed"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid status value (must be pending or completed)",
      });
      return;
    }

    const keywordItem = await Keyword.findById(id);
    if (!keywordItem) {
      res.status(404).json({
        success: false,
        message: "Keyword not found",
      });
      return;
    }

    const updatedKeyword = await Keyword.findByIdAndUpdate(
      id,
      {
        keyword: keyword !== undefined ? keyword : keywordItem.keyword,
        status: status !== undefined ? status : keywordItem.status,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Keyword updated successfully",
      data: updatedKeyword,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Keyword ID",
      });
      return;
    }

    const keywordItem = await Keyword.findById(id);
    if (!keywordItem) {
      res.status(404).json({
        success: false,
        message: "Keyword not found",
      });
      return;
    }

    await Keyword.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Keyword deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
