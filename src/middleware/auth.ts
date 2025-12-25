import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const auth = (...roles: string[]) => {
  return async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({
          message:
            "Authorization token is missing, you ar not allowed to access this resource",
          success: false,
        });
      }

      // Extract token from "Bearer <token>" format
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      const decodedToken = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      // if (roles.length && !roles.includes(decodedToken.role as string)) {
      //   return res.status(403).json({
      //     message:
      //       "Forbidden: You do not have the required permissions to access this resource",
      //     success: false,
      //   });
      // }
      req.user = decodedToken;

      next();
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized",
        error: error instanceof Error ? error.message : "Internal Server Error",
        success: false,
        errors: error,
      });
      return;
    }
  };
};

export default auth;
