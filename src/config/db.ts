import { Pool } from "pg";
import config from "./config";

export const pool = new Pool({
  connectionString: config.db_connection,
});

const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL ,
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(10)
        CHECK (role IN ('admin', 'user'))
        DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK (LENGTH(password) >= 6)
        )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(50) CHECK (type IN ('car', 'bike', 'van', 'SUV')) NOT NULL,
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10, 2) NOT NULL,
        availability_status  VARCHAR(10) CHECK (availability_status IN ('available', 'booked')) DEFAULT 'available'
    );`);

  await pool.query(`CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10, 2) NOT NULL,
        status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'returned')) NOT NULL
        )`);
};

export default initDB;
