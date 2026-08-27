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

    // 3. Backfill Services missing homePage or showOnHomePage
    const servicesHomePageToFix = await Service.find({
      $or: [
        { homePage: { $exists: false } },
        { showOnHomePage: { $exists: false } }
      ]
    });
    if (servicesHomePageToFix.length > 0) {
      console.log(`Found ${servicesHomePageToFix.length} services missing homePage/showOnHomePage. Backfilling...`);
      for (const service of servicesHomePageToFix) {
        let changed = false;
        const updateData: any = {};
        const unsetData: any = {};

        if (service.showOnHomePage === undefined) {
          updateData.showOnHomePage = false;
          changed = true;
        }

        if (!service.homePage) {
          const rawDoc = service.toObject() as any;
          
          // Generate a default tag from service name (e.g. "Personal Loan Settlement" -> "PERSONAL")
          const defaultTag = rawDoc.name 
            ? rawDoc.name.split(' ')[0].toUpperCase() 
            : "SERVICE";

          updateData.homePage = {
            tag: defaultTag,
            title: rawDoc.title || rawDoc.name || "Service Title",
            description: rawDoc.homePageDescription || rawDoc.description || "Service Description",
            image: rawDoc.image || "",
            stats: [] // Empty default array
          };

          // Also mark to remove the old homePageDescription field
          unsetData.homePageDescription = "";
          changed = true;
        }

        if (changed) {
          const updateQuery: any = { $set: updateData };
          if (Object.keys(unsetData).length > 0) {
            updateQuery.$unset = unsetData;
          }

          await Service.updateOne(
            { _id: service._id },
            updateQuery
          );
          console.log(`Backfilled homePage/showOnHomePage for service "${service.title || service.name}"`);
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