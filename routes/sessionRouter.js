import express from  'express';
import passport from 'passport';
import multer from 'multer';
import '../DB/config/auth.js';

const { Router } = express;
const sessRouter = Router();
import {getUserController, createUserController} from '../controllers/userController.js';
import logger from '../logger/logger.js';
import  sendEmail  from '../messages/email.js';
import  sendWhatsapp  from '../messages/whatsapp.js';
import  sendSMS  from '../messages/message.js';
import  {getProductsController}  from '../controllers/productController.js';

sessRouter.use(passport.initialize());
sessRouter.use(passport.session());

const upload = multer.diskStorage({
    destination: '../public/uploads',
    filename: (req,file,cb) => {
      cb( null, `${req.params.id}.${file.originalname.split('.').pop()}`)
    }
  });
  
  const avatarUpload = multer ({
    storage: upload,
    limits: {fileSize: 1 * 1024* 1024}
  });

  /* signup y login */

  sessRouter.get('/',  (req, res) => {
    res.render('form', {user: getUserController, userExist: true});
  });

sessRouter.post('/signup', 
passport.authenticate('signup', {failureMessage: 'fallo el registro', failureRedirect: '/'}),
 async (req, res) => {
  const {username, password, email, address, age, phoneNumber, avatar} = req.body;

    const existentUser = await getUserController(username);
    if (existentUser) {
        res.status(403).send('el usuario ya existe');
        return;
    } 

      await createUserController(username, password, email, address, age, phoneNumber, avatar);
      
      req.session.username = username;

      res.render('form', {user: getUserController, userExist: true})
      

    
});

sessRouter.post('/login',
passport.authenticate('login', {failureMessage: 'failure authentication', failureRedirect: '/'}),
async (req, res) => {
  const {username, password} = await req.body;

   req.session.username = username;
    req.session.password = password;
   req.session.counter = (req.session.counter ?? 0) + 1;

   const existentUser = await getUserController(username, password);

if(!existentUser) {

  res.status(403).send('el usuario no existe o es incorrecto');
  return;
} 
  res.send(`hola ${req.session.username}! bienvenido!! has entrado ${req.session.counter} veces`);

});

sessRouter.get('./menu/:username', async (req,res) => {
  const username = req.params.username;
    const userData = await getUserController( username );
    const productList = getProductsController(); 

    for ( const element of userData[0].cart ) {
      const item = await userData( username )
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

 sessRouter.get('/logout',  (req,res) => {
     req.session.destroy(  () => {
      res.send(`Hasta luego ${req.session.username}`);
   });
   res.redirect('/');
});


export default sessRouter;