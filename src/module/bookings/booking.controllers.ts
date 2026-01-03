import { Request, Response } from "express";
import { bookingService } from "./booking.services";
import { vehicleService } from "../vehicles/vehicles.services";
import { userService } from "../users/user.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBookingDB(req.body);
    const vehicle = await vehicleService.getVehicleByIdDB(
      req.body.vehicle_id
    );
    const single = {
      vehicle_name: vehicle.rows[0].vehicle_name,
      daily_rent_price: vehicle.rows[0].daily_rent_price,
    };

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: { ...result.rows[0], vehicle: single },
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

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookingsDB();
    res.status(200).json({  
        success: true,  
        message: "Bookings retrieved successfully", 
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

export const bookingControllers = {
  createBooking,
  getAllBookings,
};
