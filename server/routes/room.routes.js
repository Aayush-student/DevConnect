import { Router } from "express";
import { createRoom, getAllRooms, deleteRoom, updateRoomCode } from "../controllers/room.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const roomRouter = Router();

roomRouter.get("/", getAllRooms);
roomRouter.post("/create", verifyjwt, createRoom);
roomRouter.delete("/delete/:id", verifyjwt, deleteRoom);
roomRouter.patch("/update-code", verifyjwt, updateRoomCode);

export default roomRouter;