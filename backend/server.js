const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data.js');

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/chats', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    const chat = chats.find((c) => c._id === req.params.id);
    res.send(chat);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});