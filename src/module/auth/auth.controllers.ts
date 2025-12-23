import { Request } from "express";
import { authService } from "./auth.services";

const createUser = async (req: Request, res: any) => {
  try {
    const userData = req.body;
    
    // Call service to create user in DB
    // Assuming authService.createUserDB is properly imported
    if (!userData.password || userData.password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }
    const result = await authService.createUserDB(userData);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal Server Error",
      success: false,
      error: error,
    });
  }
};

export const authController = {
  createUser,
};
