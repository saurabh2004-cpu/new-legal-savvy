import mongoose, { Schema, Document } from "mongoose";

export interface IBlog {
  title: string;
  description: string;
  image: string;
  readTime: string;
  category: string;
  isFeatured: boolean;
  author: string;
  points: string[];
}

export interface BlogDocument extends IBlog, Document { }

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Blog description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Blog image URL/path is required"],
      trim: true,
    },
    readTime: {
      type: String,
      required: [true, "Blog read time is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
    },
    author: {
      type: String,
      required: true
    },
    points: {
      type: [String],
      default: []
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model<BlogDocument>("Blog", blogSchema);
