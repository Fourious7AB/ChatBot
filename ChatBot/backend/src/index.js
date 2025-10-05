import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000 ;
const __dirname=path.resolve();

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

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../../frontend/chart/dist")));


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/chart/dist/index.html"));
  });

}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
