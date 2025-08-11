import OpenAI from "openai";
import sql from '../configs/db.js';
import { clerkClient } from "@clerk/express";

const Ai = new OpenAI({
    apiKey: process.env.Gemini_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
export const generateArticle = async (req, res) => {
    try {
        // Prefer userId from req.auth, fallback to req.userId if set by middleware
        const userId = (req.auth && req.auth.userId) || req.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "User ID not found. Please provide a valid authentication token." });
        }
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        if (plan !== "premium" && free_usage >= 10) {
            return res.json({ success: false, message: "Free usage limit exceeded. Upgrade to premium for more requests." });
        }

        const response = await Ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });
        const content = response.choices[0].message.content;
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        if (plan !== "premium") {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                }
            });
        }
        res.json({ success: true, content });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}