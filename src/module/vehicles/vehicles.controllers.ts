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
      message:
        result.rows.length === 0
          ? "No vehicles found"
          : "Vehicles retrieved successfully",
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

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;
    // Call service to get vehicle by ID from DB
    const result = await vehicleService.getVehicleByIdDB(vehicleId);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
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

const updateVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;

    const result = await vehicleService.updateVehicleByIdDB(
      vehicleId,
      req.body
    );
  
    if(result.rows.length ===0){
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    // Placeholder response
    res.status(200).json({
      success: true,
      message: `Vehicle updated successfully`,
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
const deleteVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicleId = req.params.id;    
    const result = await vehicleService.deleteVehicleById(vehicleId);

    if(result.rows.length ===0){  
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } 
    res.status(200).json({
      success: true,
      message: `Vehicle deleted successfully`,
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
  getVehicleById,
  updateVehicleById,
  deleteVehicleById
};
