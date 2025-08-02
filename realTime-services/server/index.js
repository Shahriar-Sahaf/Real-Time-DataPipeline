require('dotenv').config({path: require('path').resolve(__dirname, '../.env') });

const express = require('express')
const app = express()
const socketio = require('socket.io')
const redis = require('redis')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)
const path =require('path')

const PORT = process.env.PORT


const clinetDirectory = path.join(__dirname,'../client')
app.use(express.static(clinetDirectory))

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient({
    url:process.env.REDIS_URL
})
client.connect()

async function subscribe() {
    try {
        client.subscribe(process.env.REDIS_SUBSCRIBE_CHANNEL,async (msg)=>{

            const data =  JSON.parse(msg);
            console.log(`${msg} is subscribe `)
            io.emit('emitData',data)
            console.log('Data emited to client successfuly')

        })
        
    } catch (error) {

        console.error(error)
    }

}


io.on('connection',(socket)=>{
    console.log('Websocket connected')

    socket.on('disconnect',()=>{

        console.log('Websocket Disconnected ')
    })

})


server.listen(PORT,()=>{
    console.log(`Server is run on port ${PORT}`)
    subscribe();
})