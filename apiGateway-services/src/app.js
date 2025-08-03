require('dotenv').config({path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const app = express();
const { rabbitmqConnected }=require('../rabbitMQ/config');
const {publish} = require('../rabbitMQ/publish');

const PORT = process.env.PORT;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function startServer(){
  await rabbitmqConnected();
}
startServer();

app.post('/api/events', publish);


app.listen(PORT,()=>{
      console.log(`Server is running on port ${PORT}`);
});
  




module.exports = {  startServer };