import connectToDb from '../DB/config/connectToDb.js';
import { cartModel, userModel } from '../DB/model/modelMongo.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js';

class Container {
  constructor(schema) {
    this.schema = schema;
  };

  async createUser(obj) {
    try {
        await connectToDb();
        const hashedPassword = await bcrypt.hash(obj.password, 10);
        const newUser = await new userModel({
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
        return true;
    } catch (err) {
        logger.error(`error al agregar usuario: ${err}`);
        return false;
    }
}




  async getUser(username) {
    try {
      await connectToDb();
      const userInDb = await userModel.find( {username});
      return userInDb ? userInDb : null;
    } catch (err) {
      logger.error(`Error: ${err}`);
      console.log(`ERRORRRR ${err}`);
    }
  }
}

const Users = new Container(userModel);

export default Users ;
