import  {persistence}  from '../enviroments/enviroment.js';
import Products from './prodClass.js';
import Users from './userClass.js';
import Chats from './chatClass.js';
import ChatsMemory from './chatClassMemory.js';
import ProductsMemory from './prodClassMemory.js';
import UsersMemory from './userClassMemory.js';





const getDao = async() => {
  let productsDao, usersDao, chatsDao;
  
    if ( persistence === 'MEMORY') {
      productsDao =  ProductsMemory;
      usersDao =  UsersMemory;
      chatsDao =  ChatsMemory;

    } else {
      
      productsDao = Products;
      usersDao =  Users;
      chatsDao =  Chats;

    };
  
  return  {
    products: productsDao,
    users: usersDao,
    chats: chatsDao
  };
};


export default getDao;