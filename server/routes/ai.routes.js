import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { analyzeCode } from "../controllers/ai.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const aiRouter = Router();

aiRouter.post("/analyze", (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      analysis: "AI temporarily disabled. Will be back soon."
    }
  });
});

export default aiRouter;