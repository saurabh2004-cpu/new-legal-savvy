import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

interface JwtPayload {
  id: string;
}

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token || req.cookies?.accessToken || req.cookies?.adminAccessToken;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "fallback_secret_key_123456";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Not authorized, admin not found",
      });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
    return;
  }
};
