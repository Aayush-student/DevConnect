import { Router } from "express";
import { analyzeCode } from "../Controllers/ai.controller.js";
import { verifyjwt } from "../Middlewares/auth.middleware.js";

const aiRouter = Router();

aiRouter.post("/analyze", verifyjwt, analyzeCode);

export default aiRouter;