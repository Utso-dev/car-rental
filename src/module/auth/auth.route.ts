import { Router } from "express";
import { authController } from "./auth.controllers";

const atuthRouter = Router();

atuthRouter.post("/signup", authController.createUser);
atuthRouter.post("/login", authController.loginUser);

export default atuthRouter;
