import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { compareSync, hashSync} from 'bcrypt';
import { getAllUsersController, createUserController, getUserControllerByUsername } from '../../controllers/userController.js';
import logger from '../../logger/logger.js';


passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const existentUser = getUserControllerByUsername(username);

    if (!existentUser) {
        done(new Error(`User with username ${username} does not exist`));
    } else {
        done(null, existentUser);
    }

});

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const users = await getAllUsersController();
    const user = users.find(user => user.username === username);
    if (!user) {
      logger.info(`(User ${username} not found)`);
      return done(null, false);
    }
    if (compareSync(password, user.password)) {
      return done(null, { username: username });
    } else {
      logger.info(`(User ${username} authentication failed)`);
      return done(null, false);
    }
  }));
  

  passport.use('signup', new LocalStrategy(async (username, password, done) => {
    try {
      const existentUser = await getUserControllerByUsername(username);
      if (existentUser) {
        done(new Error('User already exists'));
      } else {
        const user = { username, password: hashSync(password, 10) };
        const newUser = await createUserController(user);
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }));

  export default passport;