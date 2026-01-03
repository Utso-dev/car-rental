import { pool } from "../../config/db";
import { Bookings } from "../../lib";

const createBookingDB = async (data: Bookings) => {
  // Simulate database insertion logic
  const { customer_id, vehicle_id, rent_start_date, rent_end_date , status = "active" } = data;
  const dailyRentPriceResult = await pool.query(
    `SELECT v.vehicle_name, v.daily_rent_price FROM vehicles v WHERE v.id = $1`,
    [vehicle_id]
  );

  if (dailyRentPriceResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  function getDayCount(startDate: any, endDate: any) {
    const start: any = new Date(startDate);
    const end: any = new Date(endDate);
    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid date format YYYY-MM-DD expected");
    }
    if (end < start) {
      throw new Error("End date must be after start date");
    }
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

  const dataFormat = (date: any) => date.split("T")[0];

  const result = pool.query(
    "INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date ,total_price,status) VALUES ($1, $2, $3::DATE, $4::DATE, $5, $6) RETURNING *",
    [
      customer_id,
      vehicle_id,
      dataFormat(rent_start_date),
      dataFormat(rent_end_date),
      total_price,
      status,
    ]
  );

  return result;
};

const getAllBookingsDB = async () => {
  // Simulate database fetch logic
  const result = pool.query(`SELECT * FROM bookings`);
  return result;
};
const getSingleBookingsDB = async (id: number) => {
  // Simulate database fetch logic
  const result = pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  return result;
};

export const bookingService = {
  createBookingDB,
  getAllBookingsDB,
  getSingleBookingsDB,
};
