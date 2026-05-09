import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import analyzeErrorRouter from "./route/debug-route.js";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // only 20 AI calls per 15 min
    message: "Too many AI requests, slow down",
});

app.use(
    cors({
        origin: "http://localhost:3001", // your frontend
        methods: ["GET", "POST"],
    })
);
app.use("/api/debug", aiLimiter, analyzeErrorRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit with failure code
    }
}

startServer();