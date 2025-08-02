require('dotenv').config({path: require('path').resolve(__dirname, '../../.env') });
const redis = require('redis')

const redisClient = redis.createClient({
    url:process.env.REDIS_URL
}); 

async function connectedRedis(){

    try {
        await redisClient.connect();
        console.log('Redis connected successfully');
    }catch (error) {
        console.error('Redis connection error:', error);
        process.exit(1);
    }

}

async function redisCache(data){
    await redisClient.set(process.env.REDIS_CACHE,JSON.stringify(data),{
        EX: 60*10, 
    })
    console.log('message cache in Redis successfuly')


}



module.exports = {redisCache,connectedRedis};