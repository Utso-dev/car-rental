import { Router } from "express";
import auth from "../../middleware/auth";
import { userControllers } from "./user.controllers";

const userRouter = Router();

userRouter.get("/", auth(), userControllers.getAllUsers);
userRouter.get("/:id", auth(), userControllers.getUserById);
userRouter.put("/:id", auth(), userControllers.updateUserById);
userRouter.delete("/:id", auth(), userControllers.deleteUserById);

export default userRouter;
