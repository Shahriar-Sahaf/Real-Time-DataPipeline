require('dotenv').config({path: require('path').resolve(__dirname, '../../.env') });

const redis =require('redis')   

const redisclient = redis.createClient({
     url:process.env.REDIS_URL
})
redisclient.connect()

async function getAndPublish(){

    try {
        const data = await redisclient.get(process.env.REDIS_CACHE) 
        console.log('The Data is Read From Cache ',data)
        await redisclient.publish(process.env.REDIS_PUBLISH_CHANNEL,data)
        console.log(`${data} : Publish Successfuly `)
        
    } catch (error) {
        console.error('Cant Get and Publish data from Cache',error)
        
    }    
}

module.exports = {getAndPublish}