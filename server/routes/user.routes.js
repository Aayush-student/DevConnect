import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserData
} from "../controllers/users.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyjwt, logoutUser);
userRouter.get("/data", verifyjwt, getUserData);

export default userRouter;