import express from "express";
import cors from "cors";
import 'dotenv/config';
import { neon } from "@neondatabase/serverless";
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from "./routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Public route
app.get("/", (req, res) => {
  res.send("Server is Live!");
});
app.use(requireAuth());
// Protected route
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
