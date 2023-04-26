import getDao from '../class/factoryClasses.js';


const getUserDto = async( username, password) => {
  const { users } =   await getDao();
  const returnedUser = await users.getUser( username, password);
  return returnedUser;
};


const createUserDto = async (username, password, email) => {
  try {
    const { users } = await getDao();
    const existingUser = await users.getUser(username);
    
    if (existingUser) {
      throw new Error(`El usuario ${username} ya existe`);
    }
    
    const newUser = await users.createUser({
      username,
      password,
      email
    });
    
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo crear el usuario');
  }
};



export  { getUserDto, createUserDto };