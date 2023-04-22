import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import   {mongoUrl}  from '../../enviroments/enviroment.js';
import logger from '../../logger/logger.js';

const app = express();
let isConnected;

const connectToDb = async () => {
  if(!isConnected) {
    await app.use(session({
      store: new MongoStore({
        mongoUrl: mongoUrl}),
        secret: 'secreto1',
        cookie: {maxAge: 60000},  
        resave: true,
        collection: 'test',
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


export default connectToDb; 