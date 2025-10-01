import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000 ;

app.use(express.json({ limit: "10mb" })); // set the picture limit
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow common Vite dev ports
    credentials: true, // Allow credentials to be sent
  })
);

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
