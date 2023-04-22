import { getChatsDto, addChatDto } from '../dto/chatsDto.js';


const getChatsController = async() => {
  const allChats = await getChatsDto()
  return allChats
}


const addChatsController = async ( msg ) => {
  await addChatDto( msg )
  return; 
};

export  { getChatsController, addChatsController };