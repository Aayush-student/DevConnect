import { Router } from "express";
import { registerUser,loginUser,logoutUser,getUserData } from "../controllers/users.controller.js";
import { verifyjwt } from "../temp/auth.middleware.js";

const userRouter = Router();


userRouter.route("/register").post(registerUser); 

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyjwt, logoutUser);
userRouter.route("/data").get(verifyjwt, getUserData);

export default userRouter;