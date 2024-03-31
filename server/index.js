import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app)

const io = new Server(server)

io.on('connection',(socket)=>{
    console.log('a user connected');
    console.log("Id",socket.id)
})

const port = 3000;

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})