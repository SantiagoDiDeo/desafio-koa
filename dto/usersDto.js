import {getDao}from '../class/factoryClasses.js';


const getUserDto = async() => {
  const  dao =   await getDao();
  const returnedUser = await dao.users.getUsers({});
  return returnedUser;
};

const getUserByUsernameDto = async(username) => {
  const  dao =   await getDao();
  const returnedUser = await dao.users.getUserByUsername(username);
  return returnedUser;
}


const createUserDto = async (username, password, email) => {
  
    const dao = await getDao();
    const existingUser = await dao.users.getUserByUsername(username);
    
    if (existingUser) {
      throw new Error(`El usuario ${username} ya existe`);
    }
    const newUser = await dao.users.saveUser({
      username,
      password,
      email
    });
    return newUser;
};

const deleteUserDto = async (username, password) => {
  const dao = await getDao();
  const deletedUser = await dao.users.deleteUser(username, password);
  return deletedUser;
};


export  { getUserDto, createUserDto, deleteUserDto, getUserByUsernameDto };