# 🌐 Real-Time Data Pipeline Microservices system 

This is a processing pipeline project that is developed using the microservice architecture, receives the messages through the API in the first service and puts it in a rabbitmq queue, the second service reads the messages by listening to the queue and and first saves the name of the device in the PostgreSQL database and then the entire message in the MongoodB database, then the data is cached in Redis and the values cached simultaneously with the PUB / SUB algorithm by Redis. They are pulled, then the work of the third service starts and this service receives the message with the subscribe and is displayed to the user in realtime with the WebSocket algorithm with the socket.io library.

---

## Tech Stack

- **Node.js / Express.js** — Backend runtime and web framework
- **RabbitMQ** — Message broker 
- **MongoDB** — Document-based NoSQL database
- **PostgreSQL** — Relational database for structured storage
- **Redis** — In-memory cache and Pub/Sub 
- **Socket.IO** — Real-time communication with clients
- **Jest** — Testing framework

---
##  Dependencies
This project uses the following this  npm packages:

- **express** – Web framework for building APIs
- **amqplib** – RabbitMQ  for Node.js
- **mongoose** – MongoDB ODM for data modeling
- **pg** – PostgreSQL client for Node.js
- **redis** – Redis client
- **nodemon** – automatically restarts your Node.js application
- **socket.io** – Websocket Libary
- **dotenv** – Loads environment variables from `.env` file
- **jest** – Testing framework
- **supertest** – For testing HTTP APIs

## 🚀 Service Setup & Run Instructions

### 1. API Gateway Service

####  Installation
```bash
npm install
```
## 🐇 Install RabbitMQ (Windows without Docker)

1. Download Erlang: https://www.erlang.org/downloads  
2. Download RabbitMQ: https://www.rabbitmq.com/install-windows.html  
3. Start RabbitMQ:
```bash
rabbitmq-plugins enable rabbitmq_management
```
4. Visit management UI: [http://localhost:15672](http://localhost:15672)  
  Default user/pass: `guest` / `guest`


#### 🛠️ Start Service

```bash
cd apiGateway-services
nodemon app.js
```

### 🧾 2. Consumer Service

This service reads messages from RabbitMQ, stores data in MongoDB and PostgreSQL, and cache it to Redis and pulish it too.

## 🐳 Install Docker & WSL (Windows)

1. Install WSL:  
wsl --install

2. Install Docker Desktop for Windows:  
https://www.docker.com/products/docker-desktop/

3. Ensure integration with WSL2 is enabled in Docker settings.

## Install Redis
```bash
docker run -d --texonaRedis redis -p 6379:6379 redis
Test with: 
docker ps 
```

## Install MongoDB  & Robo3t
1. Download from: https://www.mongodb.com/try/download/community  
2. Start mongod and connect to mongodb://localhost:27017
3. Download Robo3T : https://robomongo.org/download.php

##  Install PostgreSQL and DBeaver

PostgreSQL  
1. Download: https://www.postgresql.org/download/windows/  
2. Download DBeaver:https://dbeaver.io/download/

#### 🛠️ Start Service

```bash
Cd Worker-services
nodemon consumer.js
```

> Ensure that:
> - RabbitMQ is running
> - MongoDB and PostgreSQL are installed and reachable
> - Redis is running on default port (6379)

---

### 💬 3. Real-Time Service (Socket.IO)

This service receives cached messages from Redis and sends them WebSocket to connected frontend clients.

#### 🛠️ Start Service

```bash
cd realTime-services
nodemon index.js
```

---

##  Running Tests

Each service can have a `__test__` folder.

To run tests:

```bash
npm test
```
## Flow Overview

1. **Client** sends data to `/api/events` with HTTP POST.
2. **API Gateway** queues it to RabbitMQ.
3. **Consumer Service** consumes it:
   - Stores all data in **MongoDB**
   - Stores device name data in **PostgreSQL**
   - Caches and publishes it via **Redis**
4. **Real-Time Service** subscribed data and sends data to clients via **Socket.IO**

---

## 🧑‍💻  Author

Created by [Shahriar Sahaf]