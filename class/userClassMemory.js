const { cartModel, userModel } = require('../DB/model/modelMongo');
const bcrypt = require('bcrypt');

class Container {
  constructor() {
    this.users = [];
  }

  async createUser(obj) {
    const encriptedPass = bcrypt.hashSync(obj.password, 10)
    const newUser = new userModel({
      username: obj.username,
      password: encriptedPass,
      email: obj.email,
      address: obj.address,
      age: obj.age,
      phoneNumber: obj.phoneNumber,
      avatar: obj.avatar,
      cart: cartModel
    });
    this.users.push(newUser);
    return true;
  };

  async getUser(username) {
    const userInDb = this.users.find(user => user.username === username);
    if (userInDb) {
      return userInDb;
    } else {
      throw new Error(`No existe el usuario ${username}`);
    }
  };

};

const usersMemory = new Container(userModel);

module.exports = { usersMemory };