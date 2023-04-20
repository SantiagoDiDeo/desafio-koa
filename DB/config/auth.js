const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const { hashSync} = require('bcrypt');
const { getUserController, createUserController } = require('../../controllers/userController');
const logger = require('../../logger/logger');


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

passport.use('signup',new LocalStrategy( (username,password, done)=> {
    const existentUser = createUserController(username, password);
    if(existentUser) {
        done(new Error('user already exists'));
        return;
    };
    const user = {username, password: hashSync(password, 10)};
    createUserController(user);
    done(null, user);
}));