
const { processingMessage } = require('../consumer'); 

const { createData } = require('../DB/MongooDB/mongoose');
const { createSensors } = require('../DB/Postgresql/pg');
const { redisCache } = require('../DB/Redis/configRedis');
const { getAndPublish } = require('../DB/Redis/getAndPublish');


jest.mock('../DB/MongooDB/mongoose', () => ({
    createData:jest.fn().mockResolvedValue(true),
}));
jest.mock('../DB/Postgresql/pg', () => ({
     createSensors:jest.fn().mockResolvedValue(true),
}));
jest.mock('../DB/Redis/configRedis', () => ({
     redisCache: jest.fn().mockResolvedValue(true),
}));
jest.mock('../DB/Redis/getAndPublish', () => ({
    getAndPublish: jest.fn().mockResolvedValue(true),
}));




describe('processingMessage Unit Test', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('it should processing message correctly', async () => {

        const testData = {
            value: '806421',
            tempreture: 30,
            humidity: 65,
            time: new Date().toISOString()
        };

        
        await processingMessage(testData);

        expect(createData).toHaveBeenCalledWith(testData);
        expect(createSensors).toHaveBeenCalledWith(testData);
        expect(redisCache).toHaveBeenCalledWith(testData);
        expect(getAndPublish).toHaveBeenCalled();
    });

    test('Throw an Error when one of my DB dosnt work ', async () => {
        const testData = { value: '456' };
        const postgresError = new Error('Connection to PostgreSQL failed');
        createSensors.mockRejectedValue(postgresError);

        await expect(processingMessage(testData)).rejects.toThrow('Connection to PostgreSQL failed');
        expect(createData).toHaveBeenCalledTimes(1);    
        expect(createSensors).toHaveBeenCalledTimes(1); 
        expect(redisCache).not.toHaveBeenCalled();
        expect(getAndPublish).not.toHaveBeenCalled();
    });
});