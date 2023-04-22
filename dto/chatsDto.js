import getDao from '../class/factoryClasses.js';


const getChatsDto = async() => {
  const chats = await ( await getDao()).chats;
  const allChats = await chats.getArray();
  return allChats;
};

const addChatDto = async( message ) => {
  const chats = await ( await getDao()).chats;
  await chats.add( message );
  return ;
};



export  { getChatsDto, addChatDto };