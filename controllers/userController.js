
const { getUserDto, createUserDto} = require('../dto/usersDto');


const validateEmail = (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(email.match(mailformat)) {
      return true;
    } else {
      alert("You have entered an invalid email address!");
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


