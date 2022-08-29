

// Web server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io")
const io = new Server(server)

// Mongoose connect
const mongoose = require('mongoose')
const User = require('./models/users')
const mongoDB = `mongodb+srv://lucilua:bBPXr2lpJ7gsRm0M@cluster0.sajrcf6.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected')
}).catch(err => console.log(err))



// Routes
app.use("/public", express.static("public", {}))
// - HOME
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


let users = {}

io.on('connection', socket => {
    // When user connect
    console.log(`[${socket.id}] LOG:USER_CONNECTED`)
    users[socket.id] = { id: socket.id, x: 0, y: 0, name: 'user' }

    // When user disconnect
    socket.on('disconnect', () => {
        console.log(`[${socket.id}] LOG:USER_DISCONNECTED`)

        // Set user to nothing when he disconnects...
        users[socket.id] = undefined

        // Att users on the room
        io.emit("ON_USERS_UPDATE", JSON.stringify(users))
    })

    // When user put your name
    socket.on("ON_USER_NAME", (newName) => {

        const user = users[socket.id]
        user.name = (newName.name || socket.id)

        // Att users on the room
        const u = new User({ id: users[socket.id].id, x: users[socket.id].x, y: users[socket.id].y, name: users[socket.id].name })
        u.save().then(() => {

            // Att users on the room
            io.emit("ON_USERS_UPDATE", JSON.stringify(users))

        })


    })

    // When user move
    socket.on("ON_USER_MOVE", (newPosition) => {

        const user = users[socket.id]
        user.x = user.x + (newPosition.move.x || 0)
        user.y = user.y + (newPosition.move.y || 0)

        // Att users on the room
        io.emit("ON_USERS_UPDATE", JSON.stringify(users))

    })

})

// Server start
server.listen(3000, () => {
    console.log('listening on: 3000');
});