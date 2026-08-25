import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { validateImage } from "../utils/image.util.js";
import { uploadImage, deleteImage } from "../services/image.service.js";
import { generateUniqueSlug } from "../services/slug.service.js";

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

    // Validate image first
    if (req.file) {
      const imgValError = validateImage(req.file, true);
      if (imgValError) {
        // Clean up Multer's auto-saved file
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
      imageUrl = await uploadImage(req.file, "blog");
    } else {
      imageUrl = req.body.image;
    }

    if (!title || !description || !imageUrl || !readTime || !category || !author) {
      // Clean up newly uploaded image if fields are missing
      if (req.file) {
        await deleteImage(imageUrl);
      }
      res.status(400).json({
        success: false,
        message: "Please provide title, description, image file, readTime, category, and author",
      });
      return;
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(title, Blog);

    let blog;
    try {
      blog = await Blog.create({
        title,
        slug,
        description,
        image: imageUrl,
        readTime,
        category,
        author,
        points: parsedPoints,
        isFeatured: isFeatured === 'true' || isFeatured === true,
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

    if (!id || !isValidObjectId(id.toString())) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(400).json({
        success: false,
        message: "Invalid Blog ID",
      });
      return;
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      if (req.file) {
        await deleteImage(`/public/uploads/${req.file.filename}`);
      }
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
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

    let imageUrl = blog.image;
    let newImageUploaded = false;

    if (req.file) {
      imageUrl = await uploadImage(req.file, "blog");
      newImageUploaded = true;
    } else if (req.body.image !== undefined) {
      if (req.body.image) {
        imageUrl = req.body.image;
      }
    }

    // Generate slug only if title changes
    let slug = blog.slug;
    if (title !== undefined && title !== blog.title) {
      slug = await generateUniqueSlug(title, Blog, id as string);
    }

    const oldImage = blog.image;
    let updatedBlog;

    try {
      updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title: title !== undefined ? title : blog.title,
          slug,
          description: description !== undefined ? description : blog.description,
          image: imageUrl,
          readTime: readTime !== undefined ? readTime : blog.readTime,
          category: category !== undefined ? category : blog.category,
          author: author !== undefined ? author : blog.author,
          points: parsedPoints !== undefined ? parsedPoints : blog.points,
          isFeatured: isFeatured !== undefined ? (isFeatured === 'true' || isFeatured === true) : blog.isFeatured,
        },
        { new: true, runValidators: true }
      );
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

    // Clean up image on disk after successful deletion
    if (blog.image) {
      await deleteImage(blog.image);
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (
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

    const blog = await Blog.findOne({ slug });

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
