import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { env } from "./config/env";
import chatRoutes from "./routes/chat.routes";
import { logger } from "./utils/logger";
import { notFoundHandler, globalErrorHandler } from "./middlewares/error.middleware";

const app: Application = express();

// =========================================
// 1. Global Middlewares
// =========================================
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

// =========================================
// 2. Route Definitions
// =========================================

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "🚀 Ultimate AI Backend is Healthy & Running!",
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// B. Main Features Routes
app.use("/api/chat", chatRoutes);

// =========================================
// 3. Error Handling (PENTING!)
// =========================================
app.use(notFoundHandler);
app.use(globalErrorHandler);

// A. 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// B. Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Server Error:", err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
