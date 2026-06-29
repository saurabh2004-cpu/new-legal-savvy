import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { PageContent } from "../models/pageContent.model.js";
import { processKeywords } from "../utils/gemini.js";
import { Keyword } from "../models/keyword.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createPageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const keywords = await Keyword.find({ status: "pending" }).limit(1);

    const firstKeyword = keywords[0];

    if (!firstKeyword) return;

    console.log(`[Cron Task] Found pending keyword: "${firstKeyword.keyword}". Starting processing...`);
    await processKeywords(keywords);

    console.log("all keywords processed")

    res.json({ success: true, message: "all keywords processed" });
  } catch (error) {
    console.error("[Cron Task] Error encountered in keyword processing cycle:", error);
    res.json({ success: false, message: "error processing keywords" });
  }
};

export const getAllPageContents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  // await PageContent.deleteMany({})
  // await Keyword.deleteMany({})


  try {
    const pageContents = await PageContent.find({}).select("-pagecontent").sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true,
      message: "Page contents retrieved successfully",
      data: pageContents,
    });
  } catch (error) {
    next(error);
  }
};

export const getPageContentBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({
        success: false,
        message: "Please provide page slug",
      });
      return;
    }

    const pageContent = await PageContent.findOne({ page_slug: slug });

    if (!pageContent) {
      res.status(404).json({
        success: false,
        message: `Page content not found for slug: ${slug}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Page content retrieved successfully",
      data: pageContent,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { page_slug, meta, heading, description, tableOfContents, sections } = req.body;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Page Content ID",
      });
      return;
    }

    const pageContent = await PageContent.findById(id);
    if (!pageContent) {
      res.status(404).json({
        success: false,
        message: "Page content not found",
      });
      return;
    }

    if (page_slug && page_slug !== pageContent.page_slug) {
      const existing = await PageContent.findOne({ page_slug });
      if (existing) {
        res.status(400).json({
          success: false,
          message: `Page content with slug '${page_slug}' already exists`,
        });
        return;
      }
    }

    const updatedPageContent = await PageContent.findByIdAndUpdate(
      id,
      {
        page_slug: page_slug !== undefined ? page_slug : pageContent.page_slug,
        pagecontent: req.body.pagecontent !== undefined ? req.body.pagecontent : pageContent.pagecontent,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Page content updated successfully",
      data: updatedPageContent,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Page Content ID",
      });
      return;
    }

    const pageContent = await PageContent.findById(id);
    if (!pageContent) {
      res.status(404).json({
        success: false,
        message: "Page content not found",
      });
      return;
    }

    await PageContent.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Page content deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
