import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blog } from "../models/blog.model.js";
import { Service } from "../models/service.model.js";
import { generateUniqueSlug } from "../services/slug.service.js";

dotenv.config();

const backfillExistingRecords = async () => {
  try {
    // 1. Backfill Blogs missing slug
    const blogsToFix = await Blog.find({ slug: { $exists: false } });
    if (blogsToFix.length > 0) {
      console.log(`Found ${blogsToFix.length} blogs missing slugs. Backfilling...`);
      for (const blog of blogsToFix) {
        blog.slug = await generateUniqueSlug(blog.title, Blog, blog._id.toString());
        await blog.save();
        console.log(`Backfilled slug for blog "${blog.title}": ${blog.slug}`);
      }
    }

    // 2. Backfill Services missing slug or image
    const servicesToFix = await Service.find({
      $or: [
        { slug: { $exists: false } },
        { image: { $exists: false } }
      ]
    });
    if (servicesToFix.length > 0) {
      console.log(`Found ${servicesToFix.length} services missing slug/image. Backfilling...`);
      for (const service of servicesToFix) {
        let changed = false;
        if (!service.slug) {
          service.slug = await generateUniqueSlug(service.title, Service, service._id.toString());
          changed = true;
        }
        if (!service.image) {
          service.image = "/public/uploads/default-service.png";
          changed = true;
        }
        if (changed) {
          await service.save();
          console.log(`Backfilled service "${service.title}": slug=${service.slug}, image=${service.image}`);
        }
      }
    }
  } catch (error) {
    console.error("Error during startup database backfill:", error);
  }
};

export async function connectDB() {
    try {
        // await mongoose.connect(MONGODB_URI!);
        await mongoose.connect('mongodb+srv://saurabh:saurabh%402004@cluster0.8edpamc.mongodb.net/');
        console.log("Connected to MongoDB");
        // Run database backfill to ensure backward compatibility and index creation
        await backfillExistingRecords();
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}