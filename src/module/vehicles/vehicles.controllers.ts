import { Request, Response } from "express";
import { vehicleService } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicleData = req.body;
    // Call service to create vehicle in DB
    // Assuming vehicleService.createVehicleDB is properly imported
    const result = await vehicleService.vehicleCreateDB(vehicleData);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
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
const getVehicles = async (req: Request, res: Response) => {
  try {
    // Call service to get vehicles from DB
    const result = await vehicleService.getVehiclesDB();
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
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

export const vehicleControllers = {
  createVehicle,
  getVehicles,
};
