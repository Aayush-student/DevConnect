import { Router } from "express";
import {
  createRoom,
  getAllRooms,
  deleteRoom,
  updateRoomCode
} from "../controllers/room.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const roomRouter = Router();

roomRouter.route("/").get(getAllRooms);
roomRouter.route("/create").post(verifyjwt, createRoom);
roomRouter.route("/delete/:id").delete(verifyjwt, deleteRoom);
roomRouter.route("/update-code").patch(verifyjwt, updateRoomCode);

export default roomRouter;