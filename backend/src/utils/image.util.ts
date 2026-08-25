import path from "path";

/**
 * Validates an uploaded image file.
 * Returns a string with the error message if invalid, or null if valid.
 */
export const validateImage = (
  file: Express.Multer.File | undefined,
  isRequired: boolean = true
): string | null => {
  if (!file) {
    if (isRequired) {
      return "Image file is required";
    }
    return null;
  }

  // Validate file size (5MB maximum)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Image size must be less than 5MB";
  }

  // Validate mime type and file extension
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".gif", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype.toLowerCase();

  if (!allowedMimeTypes.includes(mimeType) || !allowedExtensions.includes(ext)) {
    return "Only images are allowed (jpeg, jpg, png, gif, webp)";
  }

  return null;
};
