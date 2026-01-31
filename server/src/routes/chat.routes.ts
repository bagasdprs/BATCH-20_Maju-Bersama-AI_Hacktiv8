import { Router } from "express";
import { chatWithGemini } from "../controllers/chat.controller";

const router = Router();

// Definisi Route: POST /
router.post("/", chatWithGemini);

export default router;
