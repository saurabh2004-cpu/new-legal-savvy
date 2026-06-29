import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";

// Helper to validate Mongo ObjectIds
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, readTime, category, isFeatured, author, points } = req.body;
    let parsedPoints: string[] = [];
    if (points) {
      try {
        const rawPoints = JSON.parse(points);
        if (Array.isArray(rawPoints)) {
          parsedPoints = rawPoints.filter((p: string) => typeof p === 'string' && p.trim() !== '');
        }
      } catch (e) {
        console.error("Error parsing points:", e);
      }
    }
    let imageUrl = "";

    if (req.file) {
      imageUrl = `/public/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    if (!title || !description || !imageUrl || !readTime || !category || !author) {
      res.status(400).json({
        success: false,
        message: "Please provide title, description, image file, readTime, category, and author",
      });
      return;
    }

    const blog = await Blog.create({
      title,
      description,
      image: imageUrl,
      readTime,
      category,
      author,
      points: parsedPoints,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
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

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Blog ID",
      });
      return;
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, readTime, category, isFeatured, author, points } = req.body;
    
    let parsedPoints: string[] | undefined = undefined;
    if (points !== undefined) {
      try {
        const rawPoints = JSON.parse(points);
        if (Array.isArray(rawPoints)) {
          parsedPoints = rawPoints.filter((p: string) => typeof p === 'string' && p.trim() !== '');
        }
      } catch (e) {
        console.error("Error parsing points:", e);
      }
    }
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = `/public/uploads/${req.file.filename}`;
    }

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Blog ID",
      });
      return;
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title !== undefined ? title : blog.title,
        description: description !== undefined ? description : blog.description,
        image: imageUrl !== undefined ? imageUrl : blog.image,
        readTime: readTime !== undefined ? readTime : blog.readTime,
        category: category !== undefined ? category : blog.category,
        author: author !== undefined ? author : blog.author,
        points: parsedPoints !== undefined ? parsedPoints : blog.points,
        isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : blog.isFeatured,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
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

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id.toString())) {
      res.status(400).json({
        success: false,
        message: "Invalid Blog ID",
      });
      return;
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
