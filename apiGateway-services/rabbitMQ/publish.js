require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const {exportChannel} = require('./config');

const publish = async (req ,res)=>{

    try {
        const message = req.body;
        const channel = exportChannel();


        if (!channel) {

            console.log('channel not defined')
        
        }

        const insertQues = channel.sendToQueue(process.env.RABBITMQ_QUEUE,Buffer.from(JSON.stringify(message)))

        if (!insertQues) {
            console.log('Message not Inserted To Queue')    
            return res.status(500).json({message : 'Message not Inserted To Queue'})
        }
        console.log('Message Inserted To Queue :)',process.env.RABBITMQ_QUEUE);
        console.log('Message :' , message)
        return res.status(200).json({message : 'Message Inserted To Queue'})

        
    } catch (error) {
        console.log('failed to insert in queue :',error);
    }
}

module.exports={publish}
    