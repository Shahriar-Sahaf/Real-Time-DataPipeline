require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const amqp = require('amqplib');

let channel
let connection
async function rabbitmqConnected() {

    try {

        connection = await amqp.connect(process.env.RABBITMQ);
        
        channel = await connection.createChannel();
        console.log('Connected to rabbitMQ')

        const assert = await channel.assertQueue(process.env.RABBITMQ_QUEUE,{
            durable: true
        });
        if (!assert) {
            console.log('Failed assert queue')
        }

    } catch (error) {
        console.log('Error for RabbitMQ :',error);
    }
    
}

function exportChannel(){
    return channel
}


module.exports={rabbitmqConnected,exportChannel};