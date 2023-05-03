const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const chatMessage = require('./routes/messageRoutes.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');

dotenv.config();
connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', chatMessage);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    });

    socket.on('join room', (room) => socket.join(room));

    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;

        if (!chat.users) return console.log('Chat.users not defined');
        
        chat.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id) return;
            socket.in(user._id).emit('message recieved', newMessageRecieved);
        });
    });
    
});