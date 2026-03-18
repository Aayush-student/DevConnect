import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";

export const verifyjwt = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid token");
    }

    req.user = user;
    next();
});