import { Router } from "express";
import { authController } from "./auth.controllers";
import authProtected from "../../middleware/auth";

const atuthRouter = Router();

atuthRouter.post("/signup",  authController.createUser);
atuthRouter.post("/login", authController.loginUser);

export default atuthRouter;
