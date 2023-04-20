const {getDao} = require('../class/factoryClasses');


const getUserDto = async( username, password) => {
  const users = await ( await getDao()).users;
  const getUser = await users.getUser( username, password);
  return getUser;
};

const createUserDto = async( obj ) => {
  const users = await ( await getDao()).users;
  const newUser = await users.createUser( obj );
  return newUser;
};



module.exports = { getUserDto, createUserDto };