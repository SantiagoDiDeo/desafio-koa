import { getUserDto, createUserDto, deleteUserDto} from '../dto/usersDto.js';

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

const createUserController = async ( username, password, email ) => {
 
    const newUser = await createUserDto ( username, password, email );
    return newUser;
};

const deleteUserController = async (username, password) => {
  const deleteUser = await deleteUserDto(username, password);
  return deleteUser;
};

export  { createUserController, getUserController, deleteUserController };
