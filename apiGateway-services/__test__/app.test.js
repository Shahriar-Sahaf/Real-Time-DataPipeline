require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const request = require('supertest');
const {app} = require('../src/app'); 
const amqp = require('amqplib');

let connection;
let channel;

beforeAll(async () => {
  connection = await amqp.connect(process.env.RABBITMQ);
  channel = await connection.createChannel();
  await channel.assertQueue(process.env.RABBITMQ_QUEUE);
  await channel.purgeQueue(process.env.RABBITMQ_QUEUE);
});

describe('TEST /api/events', () => {
  test(' Send Message To Queue ', async () => {
  const testData = {
    device: 'test-sensor',
    temperature: 22,
    humidity :30,
    time: new Date().toISOString()
  }
  const res = await request(app).post('/api/events').send(testData);
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Message Inserted To Queue');
});
});
