
const { getUserDto, createUserDto} = require('../dto/usersDto');


const validateEmail = (mail) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (regex.test(mail)) {
    return true; 
  } else {
    alert("El mail electrónico ingresado no es válido."); 
    return false;
  };
};








const getUserController = async( username, password ) => {
  const getUser = await getUserDto( username, password );
  return getUser;
};


const createUserController = async ( username, password ) => {
  if ( validateEmail( username ) & password ) {
    await createUserDto ( username, password );
    return true;
  };
  return false  ;
};

module.exports = { createUserController, getUserController };


