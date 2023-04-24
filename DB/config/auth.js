import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { hashSync} from 'bcrypt';
import { getUserController, createUserController } from '../../controllers/userController.js';
import logger from '../../logger/logger.js';


passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const existentUser = getUserController(username);

    if (!existentUser) {
        done(new Error(`User with username ${username} does not exist`));
    } else {
        done(null, existentUser);
    }

});

passport.use('login', new LocalStrategy( async (username, password, done) => {
    const validateUser = await getUserController (username, password);
    if ( validateUser ) {     
      return done( null, { username: username } );
    } else {
      logger.info(`(User authentication failed for ${username})`);
      return done( null, false );
    };
}));

passport.use('signup',  new LocalStrategy( async (username, password, done)=> {
    const existentUser = await getUserController(username, password);
    console.log(existentUser)
    if(existentUser.length > 0 || existentUser.find((u) => u.username === username)) {
        done(new Error(`user already exists`));
        return;
    };
    const user = {username, password: hashSync(password, 10)};
    createUserController(user);
    done(null, user);
}));