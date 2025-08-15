import express from "express";
import { generateArticle, generateBlogTitle, generateImages } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";
const aiRouter= express.Router();
aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImages);
export default aiRouter;