
import { getUserDto, createUserDto} from '../dto/usersDto.js';



const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

  return regex.test(String(email).toLowerCase());
};




const getUserController = async( username, password ) => {
  const getUser = await getUserDto( username, password );
  if (!getUser.length) {
    return [];
  }
  return getUser;
};



const createUserController = async ( username, password, email ) => {
  if ( validateEmail( email) && password) {
    await createUserDto ( {username, password });
    return true;
  };
  return false  ;
};

export  { createUserController, getUserController };


