import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import http from 'http';
import { Server } from 'socket.io';


import cluster from 'cluster';
import logger from './logger/logger.js';
import benchmark from './autocannon/autocannon.js';
import prodRouter from './routes/prodRouter.js';
import sessRouter from './routes/sessionRouter.js';
import infoRouter from './routes/infoRouter.js';
import { getAllProductsController, addProductController } from './controllers/productController.js';
import { getChatsController, addChatsController } from './controllers/chatController.js';
import dotenv from 'dotenv';
import path from 'path';
import * as url from 'url';
import { PORT } from './environments/environment.js';
import connectToDb from './DB/config/connectToDb.js';

import  Koa  from 'koa';
import { koaBody} from 'koa-body';
import views from 'koa-views';
import session from 'koa-session';
import passport from 'koa-passport';
import koaStatic from 'koa-static';
import koaBodyParser from 'koa-bodyparser';

import handlebars from 'handlebars';

dotenv.config();

const horaActual = new Date().toLocaleTimeString();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));



const app = new Koa();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {cors: {origin: "*"}});

app.use(koaBody());
app.use(koaStatic(`${__dirname}/public`));
app.use(koaBodyParser());
app.use(koaStatic(path.join(__dirname, 'public')));

app.keys = ['secreto1']; // Clave de cifrado para la sesión, reemplázala con tu valor deseado
app.use(session({ connectToDb }, app));
//app.use(session({connectToDb, secret: 'secreto1', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



httpServer.on('error', (error) => {
  logger.error('ocurrio un error: ', error)
  //console.log(`ERRORRRR ${error}`);
});


//HANDLEBARS

app.use(views(path.join(__dirname, 'views'), {
  extension: 'handlebars',
  map: { handlebars: 'handlebars' },
  options: {
    defaultLayout: 'main.handlebars',
    layoutsDir: path.join(__dirname, 'views', 'hbs', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'hbs', 'partials'),
    handlebars: handlebars
  }
}));



  
//socket
io.on('connection', async socket => {
  logger.info(`New connection id: ${socket.id}`);

//tabla productos
  socket.on('getProduct', async (product) => {
    const products = await getAllProductsController(product);
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

app.use(sessRouter.routes()).use(sessRouter.allowedMethods({
  prefix: '/' 
}));
app.use(prodRouter.routes()).use(prodRouter.allowedMethods({
  prefix: '/products' 
}));
app.use(infoRouter.routes());



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
          const address = httpServer.address();
          console.log(` (${horaActual}) Servidor en modo fork corriendo en el proceso ${process.pid}  link: http://localhost:${address.port}`)
          logger.info(`Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`);
        
      });
};


