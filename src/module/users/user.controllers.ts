import { Request, Response } from "express";
import { userService } from "./user.services";

const getAllUsers = async (req: Request, res: Response) => {
  // Implementation for fetching all users from the database
  try {
    const result = await userService.getAllUsersDB();
    res.status(200).json({
      success: true,
      message:
        result.rows.length == 0
          ? "No users found"
          : "Users retrieved successfully",
      data: result.rows,
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await userService.getUserByIdDB(userId);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
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

const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await userService.updateUserByIdDB(userId, req.body);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `User updated successfully`,
      data: result.rows,
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

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUserByIdDB(userId);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `User deleted successfully`,
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

export const userControllers = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
