import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import adminRoutes from "./routes/admin.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import addressRoutes from "./routes/address.routes.js";
import consultationRoutes from "./routes/consultation.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import labelRoutes from "./routes/label.routes.js";
import keywordRoutes from "./routes/keyword.routes.js";
import pageContentRoutes from "./routes/pageContent.routes.js";
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(process.cwd(), "public")));

const allowedOrigins = process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) || [""];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
})
)

app.get('/health', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

// Register routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/consultations", consultationRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/labels", labelRoutes);
app.use("/api/v1/keywords", keywordRoutes);
app.use("/api/v1/page-contents", pageContentRoutes);

// Global error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

dotenv.config();

const PORT = process.env.PORT || 3000;

