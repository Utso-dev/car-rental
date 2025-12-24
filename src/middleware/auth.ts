import { NextFunction, Request, Response } from "express";

const authProtected = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req.headers.authorization;
      console.log(authProtected);

      if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized: No token provided",
          success: false,
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        status: "error",
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        success: false,
        error: error,
      });
    }
  };
};

export default authProtected;
