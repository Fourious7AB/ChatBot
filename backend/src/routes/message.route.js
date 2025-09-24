import express from "express";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // getUsersForSidebar returns users
router.get("/:id", protectRoute, getMessages); // getMessages returns messages between users
router.post("/send/:id", protectRoute, sendMessage); // sendMessage creates a new message

export default router;
