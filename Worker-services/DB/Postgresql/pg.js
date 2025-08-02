
require('dotenv').config({path: require('path').resolve(__dirname, '../../.env') });

const {Pool} = require('pg')

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})


const createPostgresqlTable = async ()=>{

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS data (
         id SERIAL PRIMARY KEY,
         value VARCHAR(50) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    
    `
    try {
        await pool.query(createTableQuery)
        console.log('Data Tables is ready')
    } catch (error) {
        console.log('Error creating table:', error);
    }
}

const createSensors = async(data)=>{
    if (!data.value) {
        console.log('all fields Are required !')
    }

    const query = `INSERT INTO data (value) VALUES ($1)`;
    const values = [data.value];

    try {
       
       const res = await pool.query(query,values);
       console.log('Data inserted successfully(PostgreSQL)', res.rowCount);
       return true;
        
    } catch (error) {
        console.error('Error inserting data(postgreSQL):', error);
        return false;
    }

}

module.exports= {createPostgresqlTable,createSensors}