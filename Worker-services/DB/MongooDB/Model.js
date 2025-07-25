const mongoose =require('mongoose')


const dataSchema = new mongoose.Schema({
    value :{type:String , required:true},
    tempreture :{type : Number, required:true},
    humidity :{type:Number, required:true},
    time :{type:String, required:true},
})



module.exports = mongoose.model('Data',dataSchema);