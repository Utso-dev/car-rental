import { pool } from "../../config/db";
import bycript from "bcrypt";
const getAllUsersDB = async()=>{
    const result = await pool.query("SELECT * FROM users");
    return result;
}
const getUserByIdDB = async(userId: string | number | undefined)=>{
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return result;
}

const updateUserByIdDB = async(userId: string | number | undefined, data: any)=>{

    const {name, email ,password, phone, role} = data;
    const decodePass = await bycript.hash(password, 10);
    const result= await pool.query(
        `UPDATE users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *`,
        [name, email, phone, role, userId]
    );
    return result;
}

const deleteUserByIdDB = async(userId: string | number | undefined)=>{
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);
    return result;
}

export const userService = {
    getAllUsersDB, 
    getUserByIdDB, 
    updateUserByIdDB,
    deleteUserByIdDB
}