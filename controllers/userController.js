
const { default: swal } = require('sweetalert');
const { getUserDto, createUserDto} = require('../dto/usersDto');


/* const validateEmail = (mail) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (regex.test(mail)) {
    return true; 
  } else {
    return false;
  };
}; */

const validateEmail = (email) => {
  // Expresión regular para validar la sintaxis de una dirección de correo electrónico según los estándares RFC 5322 y RFC 6530.
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

  // Validar la dirección de correo electrónico.
  return regex.test(String(email).toLowerCase());
};




const getUserController = async( username, password ) => {
  const getUser = await getUserDto( username, password );
  return getUser;
};


const createUserController = async ( username, password ) => {
  if ( validateEmail( username, password) ) {
    await createUserDto ( username, password );
    return true;
  };
  return false  ;
};

module.exports = { createUserController, getUserController };


