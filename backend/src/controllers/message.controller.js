import Usher from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getMessage = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await Usher.find({
            _id: { $ne: loggedInUser }
        }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { receiverId, text, image, imageUrl } = req.body;
        if (!receiverId || (!text && !image)) {
            return res.status(400).json({ message: "Receiver and message content required" });
        }
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            text,
            image,
            imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
