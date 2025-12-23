import { pool } from "../../config/db";
import { Users } from "../../lib";


const createUserDB= async(data: Users)=>{
    const { name, email, password, phone, role } = data;

   const result = await pool.query(`
    INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *
   `, [name, email, password, phone, role]);
   
    return result;

}


export const authService = {
    createUserDB
}