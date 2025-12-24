
import { pool } from "../../config/db";
import { Users } from "../../lib";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const createUserDB = async (data: Users) => {
  const { name, email, password, phone, role } = data;
  const bycriptPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *
   `,
    [name, email, bycriptPass, phone, role]
  );
  return result;
};

const loginUserDB = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
   `,
    [email]
  );
  if (result.rowCount === 0) {
    throw new Error("User not found");
    }

    const matchedUser = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, matchedUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials"); 
       
    }
    const token =  jwt.sign({ userId: matchedUser.id, name: matchedUser.name, email: matchedUser.email, role: matchedUser.role },  config.jwt_secret || "defaultSecretKey"  , { expiresIn: "12h" });
  return {token, user: matchedUser};
};

export const authService = {
  createUserDB,
  loginUserDB
};
