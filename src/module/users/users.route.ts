import express, { Router, Request, Response } from "express";

const userRouter = Router();


userRouter.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "All users fetched",
    data: [
      { id: 1, name: "User 1", email: "user1@example.com" },
      { id: 2, name: "User 2", email: "user2@example.com" }
    ]
  });
});




export default userRouter;
