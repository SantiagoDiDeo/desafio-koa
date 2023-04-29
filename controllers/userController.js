import { getUserDto, createUserDto, deleteUserDto, getUserByUsernameDto} from '../dto/usersDto.js';

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const getUserController = async() => {
  const getUser = await getUserDto( {} );
  if (getUser.length === 0) {
    return [];
  };
  return getUser;
};

const getUserControllerByUsername = async (username) => {
  const getUser = await getUserByUsernameDto( username );
  if (getUser.length === 0) {
    return [];
  };
  return getUser;
}

const createUserController = async ( username, password, email ) => {
 
    const newUser = await createUserDto ( username, password, email );
    return newUser;
};

const deleteUserController = async (username, password) => {
  const deleteUser = await deleteUserDto(username, password);
  return deleteUser;
};

export  { createUserController, getUserController, deleteUserController, getUserControllerByUsername };
