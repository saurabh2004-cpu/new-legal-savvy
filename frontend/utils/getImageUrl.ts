// Handles absolute URLs, relative backend paths, and removes '/api/v1' from the base URL.
export function getImageUrl(imagePath?: string): string {
  if (!imagePath) return "";

  // If the path is already an absolute HTTP/HTTPS URL, return it unchanged
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Get the base backend URL from environment variables, fallback to empty string
  const rawBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  // Remove "/api/v1" and any trailing slashes from the backend URL
  const baseUrl = rawBackendUrl.replace(/\/api\/v1\/?$/, "");

  // Ensure imagePath starts with a slash
  const relativePath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  return `${baseUrl}${relativePath}`;
}
