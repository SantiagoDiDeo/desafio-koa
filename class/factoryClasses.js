const { persistence } = require('../enviroments/enviroment');
const {Products} = require('./prodClass');
const {Users} = require('./userClass');
const {Chats} = require('./chatClass');
const {ChatsMemory} = require('./chatClassMemory');
const {ProductsMemory} = require('./prodClassMemory');
const {UsersMemory} = require('./userClassMemory');
const { productModel } = require('../DB/model/modelMongo');




const getDao = async() => {
  let productsDao, usersDao, chatsDao;
  
  if( !productsDao || !usersDao || !chatsDao ) {
    if ( persistence === 'MEMORY' ) {
      productsDao = new ProductsMemory([]);
      usersDao = new UsersMemory([]);
      chatsDao = new ChatsMemory({ chat: [] });
    } else {
      productsDao = await new Products();
      usersDao = await new Users();
      chatsDao = await new Chats();
    };
  };
  return  {
    products: productsDao,
    users: usersDao,
    chats: chatsDao
  };
};



module.exports = {getDao};