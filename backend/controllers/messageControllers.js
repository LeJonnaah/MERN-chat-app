const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel.js');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
        res.status(400);
        throw new Error('Invalid message data');
    }

    let newMessage = {
        sender: req.user._id,
        content,
        chat: chatId
    };

    try {
        let message = await Message.create(newMessage);

        message = await message.populate('sender', 'name pic');
        message = await message.populate('chat');
        message = await User.populate(message, { path: 'chat.users', select: 'name pic email' });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message }).catch((error) => console.log(error));

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid message data');
    }
});

const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name pic email').populate('chat');

        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid message data');
    }
});

module.exports = { sendMessage, allMessages };