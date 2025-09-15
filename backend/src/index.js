import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import { protectRoute } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));// set the picture limit
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
    credentials: true, // Allow credentials to be sent
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
