import { asyncHandler } from "../utilities/AsyncHandler.js";
import { ApiError } from "../utilities/ApiError.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.0-pro",
    systemInstruction: "You are DevConnect AI. Your goal is to provide elite, ultra-concise debugging advice. Use bullet points. If the code is fine, say 'Code looks solid' and suggest one optimization. Keep it under 100 words."
});

export const analyzeCode = asyncHandler(async (req, res) => {

    const { code } = req.body;

    if (!code?.trim()) {
        throw new ApiError(400, "Write some code first");
    }

    try {
        const prompt = `Critique this code for bugs or security flaws:\n\n${code}`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        const text = result.response.text();

        if (!text) {
            throw new ApiError(500, "AI returned empty response");
        }

        return res.status(200).json(
            new ApiResponse(200, { analysis: text }, "Success")
        );

    } catch (error) {
        console.error("GEMINI ERROR:", error);
        throw new ApiError(500, "AI service failed");
    }
});