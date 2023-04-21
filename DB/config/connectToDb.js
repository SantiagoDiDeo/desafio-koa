const express = require('express');
const session = require('express-session');
const app = express();
const MongoStore = require('connect-mongo');
const  { mongoUrl }  = require('../../enviroments/enviroment');
const logger = require('../../logger/logger');


let isConnected;

const connectToDb = async () => {
  if(!isConnected) {
    await app.use(session({
      store: new MongoStore({
        mongoUrl: mongoUrl}),
        secret: 'secreto1',
        cookie: {maxAge: 60000},  
        resave: true,
        collection: 'test.sessions',
        saveUninitialized: true,
        serverSelectionTimeoutMS: 30000,
        
      }));
    
          isConnected = true;
          logger.info('MongoAtlasDB Connected');
           
    return;
  } else {
    
    logger.info("Conexion existente");
    return;
  };
};


module.exports = connectToDb; 