import  {persistence}  from '../enviroments/enviroment.js';
import { prodMongoDao } from './prodClass.js';
import {userMongoDao} from './userClass.js';
import Chats from './chatClass.js';
import ChatsMemory from './chatClassMemory.js';
import {ProdMemory} from './prodClassMemory.js';
import UsersMemory from './userClassMemory.js';





export const getDao = async() => {
  let productsDao, usersDao, chatsDao;
  
    if ( persistence === 'MEMORY') {
      productsDao = new ProdMemory();
      usersDao =  UsersMemory;
      chatsDao =  ChatsMemory;

    } else {
      
      productsDao = new prodMongoDao();
      usersDao =  new userMongoDao();
      chatsDao =  Chats;

    };
  
  return  {
    products: productsDao,
    users: usersDao,
    chats: chatsDao
  };
};

