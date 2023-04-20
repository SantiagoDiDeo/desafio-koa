const { getChatsDto, addChatDto } = require('../dto/chatsDto');


const getChatsController = async() => {
  const allChats = await getChatsDto()
  return allChats
}


const addChatsController = async ( msg ) => {
  await addChatDto( msg )
  return; 
};

module.exports = { getChatsController, addChatsController };