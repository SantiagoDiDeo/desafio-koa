import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';

import session from 'express-session';
import passport from 'passport';
import cluster from 'cluster';
import logger from './logger/logger.js';
import benchmark from './autocannon/autocannon.js';
import prodRouter from './routes/prodRouter.js';
import sessRouter from './routes/sessionRouter.js';
import infoRouter from './routes/infoRouter.js';
import { getProductsController, addProductController } from './controllers/productController.js';
import { getChatsController, addChatsController } from './controllers/chatController.js';
import dotenv from 'dotenv';
import path from 'path';

import { PORT } from './enviroments/enviroment.js';
import connectToDb from './DB/config/connectToDb.js';

dotenv.config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {cors: {origin: "*"}});


app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(`${__dirname}/public`));
app.use(session({connectToDb, secret: 'secreto1', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



httpServer.on('error', (error) => {
  logger.error('ocurrio un error: ', error)
  console.log(`ERRORRRR ${error}`);
});

//HANDLEBARS
app.set('views', './views/hbs/partials');
app.set("view engine", "handlebars");
app.engine("handlebars", engine({
  extname: '.hbs',
  defaultLayout: 'main.handlebars',
  layoutsDir: `${__dirname}/views/hbs/layouts`,
  partialsDir: `${__dirname}/views/hbs/partials`
}));



  
//socket
io.on('connection', async socket => {
  logger.info(`New connection id: ${socket.id}`);

//tabla productos
  socket.emit('products', await getProductsController())
  

// nuevo producto
  socket.on('newProduct', async (product) => {
    addProductController(product);
    await io.sockets.emit('products', product)

  });

  //tabla chat
  socket.emit('chat', await getChatsController())
  
  //nuevo chat
  socket.on('newMessage', async (msg) => {
    addChatsController(msg)
    io.sockets.emit('chat', await getChatsController())
  });
  
});

app.use('/session', sessRouter);
app.use('/api', prodRouter);
app.use('/info', infoRouter);

/* cluster | server on */

let mode = 'FORK';

if (process.argv.length > 2) {

  const procArgv = process.argv[2].toUpperCase();
  if (procArgv === 'CLUSTER') {
    mode = 'CLUSTER';
  };
};

if (mode === 'CLUSTER') {
  if (cluster.isPrimary) {
  
    const numCPUs = require('os').cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      logger.info(`Process ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    
    httpServer.listen(PORT, () => {
      logger.info(`Servidor en modo cluster corriendo en el proceso ${process.pid}`);
    });
  }
} else {

  httpServer.listen(PORT, () => {
    //benchmark();
    console.log(` (${Date()}) Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`)
    logger.info(`Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`);
  });
};


