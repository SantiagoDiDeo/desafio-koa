import { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto} from '../dto/usersDto.js';
import logger from '../logger/logger.js';

const getAllUsersController = async() => {
  const getUser = await getUsersDto( {} );
  if (getUser.length === 0) {
    return [];
  };
  return getUser;
};

const getUserControllerByUsername = async (username) => {
  const existentUser = await getUserByUsernameDto( username );
  
  if(existentUser) {
    throw new Error(`User ${username} already exists`);
  }
  return existentUser;
}

const createUserController = async (user) => {
  try {
    if(user.username && user.password && user.email) {
      const newUser = await createUserDto ( user );
      console.log(newUser);
      return newUser;
    };
    throw new Error('invalid user or missing data');
  } catch (err) {
    throw new Error(err);
  }
  };

const deleteUserController = async (id) => {
  const deleteUser = await deleteUserDto(id);
  return deleteUser;

};

export  { createUserController, getAllUsersController, deleteUserController, getUserControllerByUsername };
