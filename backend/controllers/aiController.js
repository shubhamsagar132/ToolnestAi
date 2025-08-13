import OpenAI from "openai";
import sql from '../configs/db.js';
import { clerkClient } from "@clerk/express";
import axios from 'axios'
import {v2 as cloudinary} from 'cloudinary'

const Ai = new OpenAI({
    apiKey: process.env.Gemini_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
export const generateArticle = async (req, res) => {
    try {
        // Prefer userId from req.auth, fallback to req.userId if set by middleware
        const userId = (req.auth && req.auth.userId) || req.userId;
        if (!userId) {
            return res.status(401).json({success: false, message: "User ID not found. Please provide a valid authentication token." });
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

export const generateBlogTitle = async (req, res) => {
    try {
        // Prefer userId from req.auth, fallback to req.userId if set by middleware
        const userId = (req.auth && req.auth.userId) || req.userId;
        if (!userId) {
            return res.status(401).json({success: false, message: "User ID not found. Please provide a valid authentication token." });
        }
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        if (plan !== "premium" && free_usage >= 10) {
            return res.json({ success: false, message: "Free usage limit exceeded. Upgrade to premium for more requests." });
        }

        const response = await Ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 100,
        });
        const content = response.choices[0].message.content;
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

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

export const generateImages = async (req, res) => {
    try {
        // Prefer userId from req.auth, fallback to req.userId if set by middleware
        const userId = (req.auth && req.auth.userId) || req.userId;
        if (!userId) {
            return res.status(401).json({success: false, message: "User ID not found. Please provide a valid authentication token." });
        }
        const { prompt,publish } = req.body;
        const plan = req.plan;
        if (plan !== "premium" ) {
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"});
        }

        const form = new FormData()
form.append('prompt', prompt)
 const {data}=await  axios.post("https://clipdrop-api.co/text-to-image/v1'",FormData,{
     headers: 
    {'x-api-key': process.env.CLIPDROP_API_KEY,},
    responseType:"arraybuffer",
})
const bas64Image = `data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`;
 const {secure_url}=await cloudinary.uploader.upload(bas64Image)

        const content = response.choices[0].message.content;
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

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