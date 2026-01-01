import { Request, Response } from "express";
import { bookingService } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBookingDB(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
    console.log("result", result);
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
