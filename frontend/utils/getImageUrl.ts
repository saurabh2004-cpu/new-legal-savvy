// Builds a full URL for an image stored on the backend.
// Supports:
//   - Absolute URLs (http:// or https://) – returned unchanged.
//   - Relative paths such as:
//       "uploads/labels/img.png"
//       "public/uploads/labels/img.png"
//       "labels/img.png"
//   - Empty / null / undefined values → returns empty string.
//   - Optional CDN base via NEXT_PUBLIC_IMAGE_CDN (fallback to backend URL).
export function getImageUrl(imagePath?: string): string {
  if (!imagePath) return "";

  // Absolute URL – nothing to modify.
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Normalise the path: strip leading slashes.
  let cleanPath = imagePath.replace(/^\/+/, "");

  // Ensure the path is under the public uploads folder.
  if (!cleanPath.startsWith("public/uploads/")) {
    // If the path already contains "uploads/" (e.g., "uploads/labels/..."), prepend "public/".
    if (cleanPath.startsWith("uploads/")) {
      cleanPath = `public/${cleanPath}`;
    } else {
      // Otherwise, treat it as a direct filename or sub‑folder and place it under public/uploads.
      cleanPath = `public/uploads/${cleanPath}`;
    }
  }

  // Choose base URL: CDN if defined, otherwise backend.
  const cdnBase = process.env.NEXT_PUBLIC_IMAGE_CDN || "";
  const backendBaseRaw = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const backendBase = backendBaseRaw.replace(/\/api\/v1\/?$/, "");
  const base = cdnBase || backendBase;

  // If for some reason base is empty, return a relative path.
  if (!base) return `/${cleanPath}`;

  // Ensure we do not double‑slash when concatenating.
  const separator = base.endsWith("/") ? "" : "/";
  return `${base}${separator}${cleanPath}`;
}
