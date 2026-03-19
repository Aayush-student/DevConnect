import { Router } from "express";
import { analyzeCode } from "../controllers/ai.controller.js";
import { verifyjwt } from "../temp/auth.middleware.js";

const aiRouter = Router();

aiRouter.post("/analyze", verifyjwt, analyzeCode);

export default aiRouter;