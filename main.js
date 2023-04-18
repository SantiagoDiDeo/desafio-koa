const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origin: "*"}});
const session = require('express-session');
const process = require('process');
const { PORT }  = require('./enviroments/enviroment');
const {products} = require('./class/prodClass');
const { chats} = require('./class/chatClass');
const connectToDb = require('./DB/config/connectToDb');
const passport = require('passport')
const cluster = require('cluster');
const logger = require('./logger/logger');
const benchmark = require('./autocannon/autocannon');
const prodRouter = require('./routes/prodRouter');
const sessRouter = require('./routes/sessionRouter');
const infoRouter = require('./routes/infoRouter');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
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
  layoutsDir: __dirname + '/views/hbs/layouts',
  partialsDir: __dirname + '/views/hbs/partials'
}));



  
//socket
io.on('connection', async socket => {
  logger.info(`New connection id: ${socket.id}`);

//tabla productos
  socket.emit('products', await products.getArray())
  

// nuevo producto
  socket.on('newProduct', async (product) => {
    products.add(product);
    await io.sockets.emit('products', products)

  });

  //tabla chat
  socket.emit('chat', await chats.getArray())
  
  //nuevo chat
  socket.on('newMessage', async (msg) => {
    chats.add(msg)
    io.sockets.emit('chat', await chats.getArray())
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
    cluster.on('exit', (worker, code, signal) => {
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


