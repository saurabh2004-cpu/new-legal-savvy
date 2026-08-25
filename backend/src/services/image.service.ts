import path from "path";
import fs from "fs";

// Root upload directory
const uploadDir = path.join(process.cwd(), "public/uploads");

// Upload Image
export const uploadImage = async (
  file: Express.Multer.File,
  entityType: "blog" | "service"
): Promise<string> => {
  const subFolder = entityType === "blog" ? "blogs" : "services";
  const targetDir = path.join(uploadDir, subFolder);

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // If Multer diskStorage has already stored it in public/uploads, we need to move it to the subfolder
  if (file.filename) {
    const currentPath = path.join(uploadDir, file.filename);
    const newPath = path.join(targetDir, file.filename);

    // If the file is currently in public/uploads, move it to the entity subdirectory
    if (fs.existsSync(currentPath)) {
      await fs.promises.rename(currentPath, newPath);
    }
    
    return `/public/uploads/${subFolder}/${file.filename}`;
  }

  // Fallback if memoryStorage is used in the future
  if (file.buffer) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname || "image"}-${uniqueSuffix}${ext}`;
    const filepath = path.join(targetDir, filename);
    await fs.promises.writeFile(filepath, file.buffer);
    return `/public/uploads/${subFolder}/${filename}`;
  }

  throw new Error("No file content found to upload");
};

// Delete Image
export const deleteImage = async (imagePath: string): Promise<boolean> => {
  try {
    if (!imagePath) return false;

    // Prevent path traversal attacks (e.g. using '..' in the path)
    if (imagePath.includes("..") || imagePath.includes("\\..")) {
      console.warn(`Path traversal attempt ignored: ${imagePath}`);
      return false;
    }

    // Normalize path to exclude leading slash for joining
    const normalizedPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

    // Ensure the path is within public/uploads/
    if (!normalizedPath.startsWith("public/uploads/")) {
      console.warn(`Attempted deletion outside uploads directory ignored: ${imagePath}`);
      return false;
    }

    const filepath = path.join(process.cwd(), normalizedPath);

    // Ensure the resolved absolute path starts with the absolute upload directory path
    const absoluteUploadDir = path.resolve(uploadDir);
    const absoluteFilepath = path.resolve(filepath);

    if (!absoluteFilepath.startsWith(absoluteUploadDir)) {
      console.warn(`Absolute path check failed for deletion: ${imagePath}`);
      return false;
    }

    // Safely check if the file exists and delete it
    if (fs.existsSync(absoluteFilepath)) {
      await fs.promises.unlink(absoluteFilepath);
      return true;
    }

    return false;
  } catch (error) {
    // Log the error but do not throw, so the main CRUD operation does not fail
    console.error(`Failed to delete image at ${imagePath}:`, error);
    return false;
  }
};
