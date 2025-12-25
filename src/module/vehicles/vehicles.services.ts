
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
const getVehicleByIdDB = async(vehicleId: string | number | undefined)=>{
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [vehicleId]);
    return result;
}
const updateVehicleByIdDB = async(vehicleId: string | number | undefined, data: Vehicles)=>{
    const result= await pool.query(
        `
        UPDATE vehicles 
        SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5
        WHERE id = $6
        RETURNING *
        `,
        [data.vehicle_name, data.type, data.registration_number, data.daily_rent_price, data.availability_status, vehicleId]
    );
    return result;
}
const deleteVehicleById = async(vehicleId: string | number | undefined)=>{
    const result = await pool.query("DELETE FROM vehicles WHERE id = $1 RETURNING *", [vehicleId]);
    return result;
}

export const vehicleService = {
    vehicleCreateDB,
    getVehiclesDB,
    getVehicleByIdDB,
    updateVehicleByIdDB,
    deleteVehicleById
};