import { Router } from "express";
import { authController } from "./auth.controllers";

const atuthRouter = Router();

atuthRouter.post("/signup", authController.createUser);

export default atuthRouter;
