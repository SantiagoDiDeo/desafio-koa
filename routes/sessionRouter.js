import passport from 'koa-passport';
import multer from 'multer';
import '../DB/config/auth.js';

import {getAllUsersController, createUserController, getUserControllerByUsername} from '../controllers/userController.js';


import Router from '@koa/router';
const sessRouter =  new Router({ prefix: '/'});



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

  sessRouter.get('/', async (ctx) => {
    const users = await getAllUsersController()
    ctx.body = users;
  });

  sessRouter.post('/signup', passport.authenticate('signup'), async (ctx) => {
    const existentUser = await getUserControllerByUsername(ctx.request.body.username);
    if (existentUser) {
      ctx.status = 403;
      ctx.body = 'el usuario ya existe';
      return;
    }
    
    const user = ctx.request.body;
    await createUserController(user);
    
    ctx.session.username = ctx.request.body.username;
    ctx.redirect('/products');
  });
  

  sessRouter.post('/login', passport.authenticate('login'), async (ctx) => {
    const { username, password } = ctx.request.body;
    
    const existentUser = await getUserControllerByUsername(username);
  
    if (!existentUser || !compareSync(password, existentUser.password)) {
      ctx.status = 403;
      ctx.body = 'el usuario no existe o es incorrecto';
      return;
    }
  
    ctx.session.username = existentUser.username;
    ctx.redirect('/products');
  });
  


  sessRouter.get('/logout', async (ctx) => {
    await ctx.session.destroy();
    ctx.body = `Hasta luego ${ctx.session.username}`;
    ctx.redirect('/');
  });
  
sessRouter.use(passport.initialize());
sessRouter.use(passport.session());

export default sessRouter;