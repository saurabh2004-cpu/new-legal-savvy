import { Model } from "mongoose";
import { slugify } from "../utils/slug.util.js";

/**
 * Generates a unique slug for a document by checking the MongoDB database.
 * If conflicts are found, it appends a hyphen followed by an incrementing counter (e.g. -1, -2).
 *
 * @param title The title/text to generate a slug from.
 * @param model The Mongoose model to query against (e.g. Blog or Service).
 * @param existingId Optional ID of the document being updated, to ignore its own slug.
 */
export const generateUniqueSlug = async (
  title: string,
  model: Model<any>,
  existingId?: string
): Promise<string> => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<string, any> = { slug };

    if (existingId) {
      query._id = { $ne: existingId };
    }

    const exists = await model.findOne(query).select("_id").lean();
    if (!exists) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
