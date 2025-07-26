
require('dotenv').config({path: require('path').resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const Data = require('./Model')

const connectMongoDB = async ()=>{
    try {


        await mongoose.connect(process.env.MONGO_URL)

        console.log('DataBase connected successfully')
        
    } catch (error) {
    
        console.log('Cannot Connected To DataBase', error) 
        process.exit(1);  
    }
}


const createData = async (data)=>{
    try {
        const insertData = new Data(data);
        const saveInDB = await insertData.save();
        if (saveInDB) {
            console.log('inserted successfully(MongooDB)')
        }
    } catch (error) {
        console.log('Error Saving Data(MongooDB):', error);
    }
}

module.exports={connectMongoDB, createData}