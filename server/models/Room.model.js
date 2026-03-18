import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        roomTitle: {
            type: String,
            required: true,
            trim: true
        },
        language: {
            type: String,
            default: "javascript",
            trim: true
        },
        author: {
            type: String,
            default: "Anonymous",
            trim: true
        },
        code: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);