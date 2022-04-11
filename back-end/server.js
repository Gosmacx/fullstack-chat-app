const express = require('express');
const app = express()
const cors = require('cors')
const PORT = 5000

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  }
});

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


class Room {
    constructor() {
        this.users = new Map()
    }

    getuser(id) {
        return this.users.get(id)
    }

    addUser(user) {
        this.users.set(user.id, user)
    }

    removeUser(user) {
        return this.users.delete(user.id)
    }

    getArray() {
        return [...this.users.values()]
    }
}

class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

const room = new Room()


io.on("connection", (socket) => {

    socket.on("join", (data) => {
        const user = new User(socket.id, data.username)
        console.log(`${user.username} joined`)
        room.addUser(user)
        socket.emit("joined", {
            users: room.getArray()
        })
        socket.broadcast.emit("userJoined", user)
    })

    socket.on("typing", data => {
        socket.broadcast.emit("typingUser", data)
    })

    socket.on("message", msg => {
        socket.emit("messageClient", msg)
        socket.broadcast.emit("messageClient", msg)
    })

    socket.on('disconnect', () => {

        const user = room.getuser(socket.id)
        if (user) {
            console.log(`${user.username} disconnected`)
            room.removeUser(user)
            socket.broadcast.emit("disconnectedUser", user)
        }

    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})