const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

let mongo_user = process.env.MONGODB_USER;
let mongo_password = process.env.MONGODB_PASSWORD;
let mongo_url = process.env.MONGODB_URL;

function ConnectMongoDB(){
    const uri = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_url}`;

    mongoose.connect(uri, {useNewUrlParser: true, dbName:'LoginDB'}).then(res=>console.log("connected to MongoDB server"))
        .catch((err)=>{
            console.log("an error occured while connecting to the mongoDB database "+ err);
        });
    
    
    const connection = mongoose.connection;
    
    mongoose.connection.on('error', err =>{
        console.log("handling the errors that occur after connection was established")
    });
    
    //to listen to disconnection event, call handler on 'disconnected' method
    
    //define a separate config file for mongo db connections
    //use this connection object in other files
    
    //https://mongoosejs.com/docs/connections.html#connection-string-options
}

module.exports = ConnectMongoDB;


