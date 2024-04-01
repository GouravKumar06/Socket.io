import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        credentials:true
    }
})

io.on('connection',(socket)=>{
    console.log('a user connected');
    console.log("Id",socket.id)

    // socket.emit("welcome",`Hello from ${socket.id}`)
    // socket.broadcast.emit("welcome",`A new user with id ${socket.id} has joined`)

    socket.on("message",(data)=>{
        console.log(data)
        io.emit("receive-message",data)
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected with id from server",socket.id)
    })
})

app.use(cors());

const port = 5000;

app.get('/',(req,res)=>{
    res.send('hello world');
})

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
})