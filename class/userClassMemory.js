const { cartModel, userModel } = require('../DB/model/modelMongo');
const bcrypt = require('bcrypt');

class Container {
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
    const userInDb = await this.schema.findOne(user => user.username === username && user.password === password);
    if (userInDb) {
      return userInDb;
    } else {
      throw new Error(`No existe el usuario ${username}`);
    }
  };

};

const usersMemory = new Container;

module.exports = { usersMemory };