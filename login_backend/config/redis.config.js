const redis = require('redis');
require('dotenv').config();

let redis_user=process.env.REDIS_USER;
let redis_password=process.env.REDIS_PASSWORD;
let redis_host=process.env.REDIS_HOST;
let redis_port=process.env.REDIS_PORT;

const connectRedisDB = () =>{
    const client = redis.createClient({
    //    url: redis_url
        username: redis_user,
        password: redis_password,
        socket: {
            host: redis_host,
            port: redis_port
        } 
    });

    client.connect();

    client.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });
    client.on('connect', function (err) {
        console.log('Connected to redis successfully');
    });
    
    //connect when you need it and close it afterwards
    //await client.connect();
    return client;
}

module.exports = connectRedisDB;
