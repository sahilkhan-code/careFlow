import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not configured");
// }

interface AccessTokenPayload {
  userId: number;
  role: "ADMIN" | "STAFF" | "DOCTOR" | "PATIENT";
}

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  return next();

  
  // const authorization = req.headers.authorization;

  

  // if (!authorization?.startsWith("Bearer ")) {
  //   return res.status(401).json({
  //     status: false,
  //     message: "Authentication token required",
  //   });
  // }

  // const token = authorization.slice(7);

  // try {
  //   const decoded = jwt.verify(token, JWT_SECRET);

  //   if (
  //     typeof decoded === "string" ||
  //     typeof decoded.userId !== "number" ||
  //     !["ADMIN", "STAFF", "DOCTOR", "PATIENT"].includes(
  //       decoded.role as string,
  //     )
  //   ) {
  //     return res.status(401).json({
  //       status: false,
  //       message: "Invalid authentication token",
  //     });
  //   }

  //   req.user = decoded as AccessTokenPayload;

  //   next();
  // } catch {
  //   return res.status(401).json({
  //     status: false,
  //     message: "Invalid or expired token",
  //   });
  // }
};