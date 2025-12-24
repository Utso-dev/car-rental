
import { pool } from "../../config/db";
import { Vehicles } from "../../lib";


const vehicleCreateDB = async(data: Vehicles) => {
     const  {vehicle_name, type, registration_number, daily_rent_price, availability_status} = data;

    const result = await pool.query(
        `
        INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    );

    return result;
}

const getVehiclesDB =async ()=>{
    const result = await pool.query("SELECT * FROM vehicles");
    return result;
}

export const vehicleService = {
    vehicleCreateDB,
    getVehiclesDB
};