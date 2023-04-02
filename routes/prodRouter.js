const express = require( 'express' );
const {products} = require('../class/prodClass');
const connectToDb = require('../DB/config/connectToDb');
const { faker } = require('@faker-js/faker');
const { mockProducts } = require('../class/mockClass');
faker.locate = 'es';
const { Router } = express;
const session = require('express-session');
const passport = require('passport');
require('../DB/config/auth');
const prodRouter = Router();
const { fork } = require('child_process');
const logger = require('../logger/logger');
const users = require('../class/userClass');
const multer = require('multer');
const { sendEmail } = require('../messages/email');
const { sendWhatsapp } = require('../messages/whatsapp');
const { sendSMS } = require('../messages/message');


prodRouter.use(passport.initialize());
prodRouter.use(passport.session());


const upload = multer.diskStorage({
  destination: '../public/uploads',
  filename: (req,file,cb) => {
    cb( null, req.params.id + '.' + file.originalname.split('.').pop());
  }
});

const avatarUpload = multer ({
  storage: upload,
  limits: {fileSize: 1 * 1024* 1024}
});


//get all products
prodRouter.get('/', async ( req, res ) => {
    const allProducts = await products.getArray();
    res.json(allProducts);
});

//get products by id
prodRouter.get('/:id', async ( req, res ) => {
    let id = req.params.id;
    const product = await products.getById(id);
    product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})  ;

});

//post product
prodRouter.post('/productos', async (req, res) => {
    const productToAdd = await req.body;
    await products.add(productToAdd);
    res.redirect('/');
  });

//update product
prodRouter.put('/:id', async ( req, res ) => {
    const id = req.params.id;
    const  replace  = req.body;

    const index = id - 1;

    if(await products.adjustById( id, productToModify )){
        res.send({ message: 'producto modificado'});
      } else {
        res.status(404).send({ error: 'producto no encontrado'});
      };
    
});

//delete product
prodRouter.delete('/:id', async ( req, res ) => {
    const { id } = req.params;

    if (await products.delById(id)) {
        res.send({ message: 'producto borrado'});
      } else {
        res.status(404).send({ error: 'producto no encontrado'});
      };
});

prodRouter.get('/productos-test', (req, res) => {
  const products = mockProducts.getArray();
  logger.info(products);
  res.json(products);
});






/* signup y login */

prodRouter.post('/signup', 
passport.authenticate('signup', {failureMessage: 'fallo el registro', failureRedirect: '/'}),
 (req, res) => {
  const {username, password, email, address, age, phoneNumber, avatar} = req.body;

    const existentUser = users.getUser(user => user.username);
    if (existentUser) {
        res.status(403).send('el usuario ya existe');
        return;
    } else {

      users.push(... users,  {username, password, email, address, age, phoneNumber, avatar});
      
      req.session.username = username;

      res.send(`hola ${req.session.username}! bienvenido!! `);
      
      //res.redirect(`./menu/${users.username}`)

    };
});

prodRouter.post('/login',
passport.authenticate('login', {failureMessage: 'failure authentication', failureRedirect: '/'}),
async (req, res) => {
  const {username, password} = req.body;

   req.session.username = username;

   req.session.counter = (req.session.counter ?? 0) + 1;

   const existentUser = users.find(user => user.username);

if(!existentUser) {

  res.status(403).send('el usuario no existe');
  return;
} else {
  //res.redirect(`./menu/${existentUser}`)
  res.send(`hola ${req.session.username}! bienvenido!! has entrado ${req.session.counter} veces`);
  
};

});

prodRouter.get(`./menu/:username`, async (req,res) => {
  const username = req.params.username;
    const userData = await users.getUser( username );
    const productList = [];

    for ( const element of userData[0].cart ) {
      const item = await products.getById( element.id )
      productList.push({ 
        title: item[0].title,
        code: item[0].code,
        cant: element.cant
       })
    }

    sendEmail({
      from: 'Administrador',
      to: process.env.EMAIL_ADMIN,
      subject: `Nuevo pedido de ${username}`,
      text: '',
      html: ( productList )
    })

    sendWhatsapp({
      body: `Nuevo pedido de ${username}`,
      to: userData[0].phoneNumber
    })

    sendSMS({
      body: 'Pedido recibido',
      number: userData[0].phoneNumber
    })
    
    res.status(200).send({ cart: userData })
  }
  );



/* apirandoms */

prodRouter.get('/api/randoms', (req, res) => {
  const cant = req.query.cant || 100000000;
  const child = fork('./randoms.js');
  child.send(cant);
  child.on('message', (data) => {
    res.json(data);
  });
});



prodRouter.get('/logout', async (req,res) => {


     req.session.destroy(  () => {
       res.send(`Hasta luego ${req.session.username}`);
    });
    res.redirect('/');
});

module.exports = prodRouter;