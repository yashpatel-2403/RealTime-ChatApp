import User from "../models/user.model.js"
import Message from "../models/message.model.js"


import cloudinary from "../lib/cloudinary.js"


export const getUserForSidebar = async (req,res) => {
    try {
        const LoggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: LoggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const sendMessage = async (req,res) => {
    try {
        const {text, image} = req.body;
        const senderId = req.user._id;
        const {id:receiverId} = req.params;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //TODO: Implement socket.io to send real-time messages

        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}