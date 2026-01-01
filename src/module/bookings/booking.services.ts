import { pool } from "../../config/db";
import { Bookings } from "../../lib";

const createBookingDB = async (data: Bookings) => {
  // Simulate database insertion logic
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;
  const dailyRentPriceResult = await pool.query(
    `SELECT v.daily_rent_price FROM vehicles v WHERE v.id = $1`,
    [vehicle_id]
  );
  if (dailyRentPriceResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  function getDayCount(startDate: any, endDate: any) {
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);

    // 1 day = 24 * 60 * 60 * 1000 ms
    const diffInMs = end - start;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
  }

  const days = getDayCount(rent_start_date, rent_end_date);
  const dailyRentPrice = parseFloat(
    dailyRentPriceResult.rows[0].daily_rent_price
  );
  const total_price = days * dailyRentPrice;
  const result = pool.query(
    "INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date ,total_price,status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );
  return result;
};

const getAllBookingsDB = async () => {
  // Simulate database fetch logic
  const result = pool.query(`SELECT * FROM bookings`);
  return result;
};

export const bookingService = {
  createBookingDB,
  getAllBookingsDB,
};
