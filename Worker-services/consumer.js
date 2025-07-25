
require('dotenv').config({path: require('path').resolve(__dirname, '../.env') });


const {exportChannel,rabbitmqConnected} = require('../apiGateway-services/rabbitMQ/config')
const {connectMongoDB,createData} = require('./DB/MongooDB/mongoose')
const {createPostgresqlTable,createSensors} = require('./DB/Postgresql/pg')
const {redisCache,connectedRedis} =require('./DB/Redis/configRedis')
const {getAndPublish}=require('./DB/Redis/getAndPublish')


async function consumer() {
    try {

        await rabbitmqConnected();
        await connectedRedis();
        await connectMongoDB();
        await createPostgresqlTable();
        console.log('All Services connected Successfuly ')
        const channel = exportChannel(); 
        await channel.prefetch(1);
        
        await channel.consume(process.env.RABBITMQ_QUEUE,async (msg) => {
            console.log('Message Received');
            if (!msg) {
                console.log('No message received');
            }
            const data =  JSON.parse(msg.content.toString());
            console.log('Message :', data);
            await processingMessage(data);
            channel.ack(msg);
            
        })
        
        
    } catch (error) {
        console.log('Error in Connection or Consuming ')
    }
}

async function processingMessage(data) {

    try {

        await createData(data);
        await createSensors(data);
        await redisCache(data);
        await getAndPublish()
        
    } catch (error) {
        console.log('Error to Create , Cache or Publish Data :',error);
        throw error;
    }

    
}

consumer()
module.exports= {processingMessage,consumer}
