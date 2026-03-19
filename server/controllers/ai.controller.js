import dotenv from "dotenv";
dotenv.config();

import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export const analyzeCode = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code || !code.trim()) {
    throw new ApiError(400, "Write some code first");
  }

  if (!genAI) {
    throw new ApiError(500, "AI not configured");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are DevConnect AI. Give short, clear debugging help in bullet points. If the code is fine, say 'Code looks solid' and suggest one improvement. Keep it under 100 words."
    });

    const prompt = `Analyze this code and find bugs or improvements:\n\n${code}`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return res
      .status(200)
      .json(new ApiResponse(200, { analysis: text }, "Success"));

  } catch (error) {
    console.error("AI ERROR FULL:", error);
    throw new ApiError(500, "AI service failed");
  }
});