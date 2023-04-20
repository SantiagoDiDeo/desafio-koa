const { persistence } = require('../enviroments/enviroment');
const {products} = require('./prodClass');
const {users} = require('./userClass');
const {chats} = require('./chatClass');
const {chatsMemory} = require('./chatClassMemory');
const {productsMemory} = require('./prodClassMemory');
const {usersMemory} = require('./userClassMemory');



let productsDao = undefined, usersDao = undefined, chatsDao = undefined;

const getDao = async() => {
  if( !productsDao ) {
    if ( persistence === 'MEMORY' ) {
      productsDao = new productsMemory([]);
      usersDao = new usersMemory([]);
      chatsDao = new chatsMemory({ chat: [] });
    } else {
      productsDao = await  products;
      usersDao = await  users;
      chatsDao = await  chats;
    };
  };
  return {
    products: productsDao,
    users: usersDao,
    chats: chatsDao
  };
};



module.exports = {getDao};