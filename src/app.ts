import express, { Request, Response } from "express";
import { log } from "node:console";
import userRouter from "./module/users/users.route";
import atuthRouter from "./module/auth/auth.route";
import initDB from "./config/db";
import vehiclesRouter from "./module/vehicles/vehicles.route";

const app = express();

app.use(express.json());
// intial database connection here
initDB()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Hello World endpoint was hit");
});

// /api/v1/auth   
app.use("/api/v1/auth/", atuthRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/vehicles", vehiclesRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false,
    message: "Endpoint not found" ,
    path: req.path
  });
});


export default app;

