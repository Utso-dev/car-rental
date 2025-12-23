import dotenv from "dotenv";

import path from "path";

dotenv.config({path:path.join( process.cwd(),".env")});

const config={
    port:process.env.SERVER_PORT || 4000,
    db_connection: process.env.DB_SECRET_KEY || "",
    jwt_secret: process.env.JWT_SECRET
}

export default config;