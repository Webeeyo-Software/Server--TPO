import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

interface JwtPayload {
  userId: number;
  role: string;
}

// Middleware to authenticate JWT token for protected routes
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = payload; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
