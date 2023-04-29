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
import * as url from 'url';
import { PORT } from './enviroments/enviroment.js';
import connectToDb from './DB/config/connectToDb.js';

dotenv.config();

const horaActual = new Date().toLocaleTimeString();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));



const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {cors: {origin: "*"}});


app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({connectToDb, secret: 'secreto1', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



httpServer.on('error', (error) => {
  logger.error('ocurrio un error: ', error)
  //console.log(`ERRORRRR ${error}`);
});


//HANDLEBARS
/* app.set('views', './views/hbs/partials');
app.set("view engine", "handlebars");
app.engine("handlebars", engine({
  extname: '.hbs',
  defaultLayout: 'main.handlebars',
  layoutsDir: path.join(__dirname, 'views', 'hbs', 'layouts'),
  partialsDir: `${__dirname}/views/hbs/partials`
}));
 */
app.set('views', path.join(__dirname, 'views', 'hbs', 'partials'));
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
  extname: '.hbs',
  defaultLayout: 'main.handlebars',
  layoutsDir: path.join(__dirname, 'views', 'hbs', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'hbs', 'partials')
}));



  
//socket
io.on('connection', async socket => {
  logger.info(`New connection id: ${socket.id}`);

//tabla productos
  socket.on('getProduct', async (product) => {
    const products = await getProductsController(product);
    io.sockets.emit('newProduct', products);
  });
  

// nuevo producto
  socket.on('newProduct', async (product) => {
    const productToAdd = await addProductController(product);
    io.sockets.emit('newProduct', productToAdd);
  });

  //tabla chat
  socket.on('newChat', async (msg) => {
   await getChatsController()
   const chatToAdd =  await addChatsController(msg)
   io.sockets.emit('newChat', chatToAdd);
  });
  
});

app.use('/', sessRouter);
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
    console.log(` (${horaActual}) Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`)
    logger.info(`Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`);
  });
};


