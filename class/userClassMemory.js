import { use } from 'chai';
import { cartModel, userModel } from '../DB/model/modelMongo.js';
import bcrypt from 'bcrypt';

let userMemory = [];

export class Container {
  constructor(schema) {
    this.schema = schema;
  }

  async createUser(obj) {
    const encriptedPass = bcrypt.hashSync(obj.password, 10)
    const newUser = await new userModel({
      username: obj.username,
      password: encriptedPass,
      email: obj.email,
      address: obj.address,
      age: obj.age,
      phoneNumber: obj.phoneNumber,
      avatar: obj.avatar,
      cart: cartModel
    });
    this.schema.push(newUser);
    return true;
  };


  async getUser(username, password) {
    const userInDb = await this.schema.findOne({username, password});
    
    if (!userInDb) {
      throw new Error(`No existe el usuario ${username}`);
    }
  
    if (bcrypt.compareSync(password, userInDb.password)) {
      return userInDb;
    } else {
      throw new Error(`Contraseña incorrecta para el usuario ${username}`);
    }
  }

}
const UsersMemory = new Container(userModel);

export default UsersMemory ;