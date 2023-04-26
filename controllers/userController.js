
import { getUserDto, createUserDto} from '../dto/usersDto.js';



const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};



const getUserController = async( username, password ) => {
  const getUser = await getUserDto( username, password );
  if (!getUser.length) {
    return [];
  };
  return getUser;
};



const createUserController = async ( username, password, email ) => {
  if ( validateEmail( email)) {
    const newUser = await createUserDto ( {username, password });
    return newUser;
  } else {
    let errorMsg = "No se pudo crear el usuario. ";
    if (!password) {
      errorMsg += "La contraseña no puede estar vacía.";
    } else if (!validateEmail(email)) {
      errorMsg += "El correo electrónico proporcionado no es válido. ";
    }
    return errorMsg;
  }
};

export  { createUserController, getUserController };


