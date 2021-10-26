import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 8787;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});


//Connexion des clients

socketServer.on(IOEVENTS.CONNECTION, async (socket) => {
    console.log(socket.id);
    await newUser(socket);

    socket.on(IOEVENTS.SEND_MESSAGE, message => {
        console.log(message);
        const messageToBroadcast = {
            socketId: socket.id,
            text: message.text,
            timestamp: dayjs(),
            avatar: socket.data.identity.avatar,
            name: socket.data.identity.name
        };
        socketServer.emit(IOEVENTS.NEW_MESSAGE, messageToBroadcast);
    });

    socket.on(IOEVENTS.CHANGE_USERNAME, identity => {
        socket.data.identity.name = identity.name;
        sendUserIdentities();
    });
    
    socket.on(IOEVENTS.DISCONNECT, reason => {
        sendUserIdentities();
    });
});


async function newUser(socket) {

    const newUser = {
        id: socket.id,
        name: 'Anonyme',
        avatar: randomAvatarImage()
    };
    socket.data.identity = newUser;
    await sendUserIdentities();
}


async function sendUserIdentities() {

    // Room concept
    const sockets = await socketServer.fetchSockets();
    const users = sockets.map(s => s.data.identity);
    
    socketServer.emit(IOEVENTS.LIST_USERS, users);
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}