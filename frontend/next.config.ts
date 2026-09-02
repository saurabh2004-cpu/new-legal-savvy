// next.config.ts – dynamic remote patterns for image optimisation
import type { NextConfig } from "next";
import { URL } from "url";

// Determine environment
const isDev = process.env.NODE_ENV === "development";

// Backend base URL (e.g., http://localhost:3001/api/v1 or https://api.example.com/api/v1)
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// Helper to build a remote pattern from the backend URL
function buildProdPattern(url: string) {
  try {
    const parsed = new URL(url);
    const protocol = parsed.protocol.replace(":", "");
    const hostname = parsed.hostname;
    const port = parsed.port; // may be empty for standard ports
    const pattern: any = {
      protocol,
      hostname,
      pathname: "/public/uploads/**",
    };
    if (port) pattern.port = port;
    return pattern;
  } catch (e) {
    console.warn("Unable to parse NEXT_PUBLIC_BACKEND_URL for image remote pattern", e);
    return null;
  }
}

// Base remote patterns for development (localhost)
const remotePatterns: any[] = [
  { protocol: "http", hostname: "localhost" },
  { protocol: "http", hostname: "localhost", port: "3001", pathname: "/public/uploads/**" },
];

// Add production pattern if we have a valid backend URL
const prodPattern = backendUrl ? buildProdPattern(backendUrl) : null;
if (prodPattern) remotePatterns.push(prodPattern);

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    ...(isDev && { dangerouslyAllowLocalIP: true }),
  },
};

export default nextConfig;
