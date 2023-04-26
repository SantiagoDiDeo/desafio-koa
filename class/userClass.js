import connectToDb from '../DB/config/connectToDb.js';
import { cartModel, userModel } from '../DB/model/modelMongo.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js';

export class Container {
  constructor(schema) {
    this.schema = schema;
  };

  async createUser(obj) {
    try {
        await connectToDb();
        const hashedPassword = await bcrypt.hash(obj.password, 10);
        const newUser =  new this.schema({
            username: obj.username,
            password: hashedPassword,
            email: obj.email,
            address: obj.address,
            age: obj.age,
            phoneNumber: obj.phoneNumber,
            avatar: obj.avatar,
            cart: cartModel
        });
        const savedUser = await newUser.save();
        logger.info(`usuario agregado. ${savedUser._id}`);
        return savedUser;
    } catch (err) {
        logger.error(`error al agregar usuario: ${err}`);
        
    }
}




  async getUser(username) {
    try {
      await connectToDb();
      const userInDb = await this.schema.find( {username});
      return userInDb ? userInDb : null;
    } catch (err) {
      logger.error(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    }
  }
}

const Users = new Container(userModel);

export default Users ;
