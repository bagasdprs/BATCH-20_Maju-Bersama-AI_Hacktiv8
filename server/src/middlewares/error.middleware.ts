import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
};

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Server Error:", err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
