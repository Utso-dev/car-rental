import { Router } from "express";
import { bookingControllers } from "./booking.controllers";

export const bookingsRouter = Router();



bookingsRouter.post("/", bookingControllers.createBooking);
bookingsRouter.get("/", bookingControllers.getAllBookings);
// bookingsRouter.get("/:id", bookingControllers.getBookingById);
// bookingsRouter.put("/:id", bookingControllers.updateBookingById);
// bookingsRouter.delete("/:id", bookingControllers.deleteBookingById);