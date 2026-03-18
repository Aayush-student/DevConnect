import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Room } from "../models/Room.model.js";

export const createRoom = asyncHandler(async (req, res) => {
    const { roomId, roomTitle, language, author } = req.body;

    if (!roomId || !roomTitle) {
        throw new ApiError(400, "Room ID and Title are required");
    }

    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
        throw new ApiError(409, "Room ID already exists");
    }

    const room = await Room.create({
        roomId,
        roomTitle,
        language: language || "javascript",
        author
    });

    return res.status(201).json(new ApiResponse(201, room, "Room created"));
});

export const getAllRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, rooms, "Rooms retrieved"));
});

export const deleteRoom = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const room = await Room.findOneAndDelete({ roomId: id });

    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Room deleted"));
});

export const updateRoomCode = asyncHandler(async (req, res) => {
    const { roomId, code } = req.body;

    if (!roomId) {
        throw new ApiError(400, "Room ID required");
    }

    const room = await Room.findOneAndUpdate(
        { roomId },
        { $set: { code } },
        { new: true }
    );

    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    return res.status(200).json(new ApiResponse(200, room, "Code saved"));
});