import type { Request, Response, NextFunction } from "express";
import { Admin } from "../models/admin.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
      return;
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
      return;
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    if (admin) {
      generateToken(res, admin._id.toString());

      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid admin data",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
      return;
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.comparePassword(password))) {
      generateToken(res, admin._id.toString());

      res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        data: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.cookie("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.cookie("adminAccessToken", "", {
      httpOnly: false,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Current admin data retrieved successfully",
      data: req.admin,
    });
  } catch (error) {
    next(error);
  }
};
