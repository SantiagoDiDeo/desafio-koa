import { use } from 'chai';
import { cartModel, userModel } from '../DB/model/modelMongo.js';
import bcrypt from 'bcrypt';

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

  // async getUser(username, password) {
  //   const userInDb = await this.schema.find(user => user.username === username && user.password === password);
  //   console.log(userInDb);
  //   if (userInDb) {
  //     return userInDb;
  //   } else {
  //     throw new Error(`No existe el usuario ${username}`);
  //   }
  // };

  async getUser(username, password) {
    const userInDb = this.schema.find(user => user.username === username);
    console.log('userInDb:', userInDb); // imprime el usuario encontrado en la base de datos
  
    if (!userInDb) {
      throw new Error(`No existe el usuario ${username}`);
    }
  
    if (bcrypt.compareSync(password, userInDb.password)) {
      console.log('password correcto'); // imprime si el password es correcto
      return userInDb;
    } else {
      throw new Error(`Contraseña incorrecta para el usuario ${username}`);
    }
  }

}
const UsersMemory = new Container(userModel);

export default UsersMemory ;