import express, { Request, Response } from "express";
import { log } from "node:console";
import userRouter from "./module/users/users.route";
import atuthRouter from "./module/auth/auth.route";
import initDB from "./config/db";

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



export default app;

