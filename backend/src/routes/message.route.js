import express from "express";
import { getMessage, sendMessage, createMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/Users", protectRoute, getMessage); // getMessage returns users
router.get("/:id", protectRoute, sendMessage); // sendMessage returns messages between users
router.post("/", protectRoute, createMessage); // createMessage creates a new message

export default router;